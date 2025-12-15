import { jest } from "@jest/globals";
import AppError from "../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../Commons/Constants/HttpStatus.js";
import { signToken } from "../../../Commons/Utils/JwtHelper.js";
import { optionalAuth, createRequireAuthMiddleware, createAuthorizeMiddleware } from "../AuthMiddleware.js";

const createRes = () => {
	const res = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe("AuthMiddleware", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("optionalAuth should set user null and pass when no header", () => {
		const req = { get: jest.fn().mockReturnValue(null) };
		const next = jest.fn();
		optionalAuth(req, {}, next);
		expect(req.user).toBeNull();
		expect(next).toHaveBeenCalled();
	});

	test("optionalAuth should reject invalid header", () => {
		const req = { get: jest.fn().mockReturnValue("token") };
		const next = jest.fn();
		optionalAuth(req, {}, next);
		expect(next).toHaveBeenCalledWith(expect.any(AppError));
	});

	test("optionalAuth decodes bearer token or rejects malformed token", () => {
		process.env.JWT_SECRET = "secret";
		const token = signToken({ sub: 5 }, { secret: "secret" });
		const req = { get: jest.fn().mockReturnValue(`Bearer ${token}`) };
		const next = jest.fn();

		optionalAuth(req, {}, next);
		expect(req.user.sub).toBe(5);
		expect(next).toHaveBeenCalledTimes(1);

		const badNext = jest.fn();
		optionalAuth({ get: jest.fn().mockReturnValue("Bearer bad-token") }, {}, badNext);
		expect(badNext).toHaveBeenCalledWith(expect.any(AppError));
	});

	test("requireAuth validates token, user presence, and active status", async () => {
		const tokenVerifier = jest.fn().mockReturnValue({ sub: "1", payload: true });
		const userService = {
			getUser: jest.fn().mockResolvedValue({ id: 1, status: "active", role: null, permissions: [] })
		};
		const middleware = createRequireAuthMiddleware({ userService, tokenVerifier });
		const req = { get: jest.fn().mockReturnValue("Bearer token") };
		const next = jest.fn();
		await middleware(req, createRes(), next);
		expect(req.user?.id).toBe(1);

		userService.getUser.mockResolvedValue({ id: 2, status: "inactive", role: null });
		await middleware(req, createRes(), next);
		expect(next).toHaveBeenCalledWith(new AppError("User account is not active", HttpStatus.FORBIDDEN));
	});

	test("requireAuth handles missing service or invalid verifier", () => {
		expect(() => createRequireAuthMiddleware()).toThrow("AUTH_MIDDLEWARE.REQUIRE_AUTH_MISSING_USER_SERVICE");
		expect(() => createRequireAuthMiddleware({ userService: {}, tokenVerifier: "bad" })).toThrow(
			"AUTH_MIDDLEWARE.INVALID_TOKEN_VERIFIER"
		);
	});

	test("requireAuth rejects missing token, invalid sub, or missing user", async () => {
		const tokenVerifier = jest.fn().mockReturnValue({ sub: "nan" });
		const userService = { getUser: jest.fn().mockResolvedValue(null) };
		const middleware = createRequireAuthMiddleware({ userService, tokenVerifier });
		const next = jest.fn();

		await middleware({ get: jest.fn().mockReturnValue(null) }, createRes(), next);
		expect(next).toHaveBeenCalledWith(
			new AppError("Missing or invalid authorization header", HttpStatus.UNAUTHORIZED)
		);

		await middleware({ get: jest.fn().mockReturnValue("Bearer token") }, createRes(), next);
		expect(next).toHaveBeenCalledWith(new AppError("Invalid or expired token", HttpStatus.UNAUTHORIZED));

		tokenVerifier.mockReturnValue({ sub: "1" });
		await middleware({ get: jest.fn().mockReturnValue("Bearer token") }, createRes(), next);
		expect(next).toHaveBeenCalledWith(new AppError("User not found", HttpStatus.UNAUTHORIZED));

		tokenVerifier.mockReturnValue({ sub: {} });
		await middleware({ get: jest.fn().mockReturnValue("Bearer token") }, createRes(), next);
		expect(next).toHaveBeenCalledWith(new AppError("Invalid or expired token", HttpStatus.UNAUTHORIZED));
	});

	test("requireAuth propagates decoding errors and invalid domain users", async () => {
		const erroringVerifier = jest.fn(() => {
			throw new Error("decode fail");
		});
		const userService = { getUser: jest.fn() };
		const middleware = createRequireAuthMiddleware({ userService, tokenVerifier: erroringVerifier });
		const next = jest.fn();

		await middleware({ get: jest.fn().mockReturnValue("Bearer token") }, createRes(), next);
		expect(next).toHaveBeenCalledWith(new AppError("Invalid or expired token", HttpStatus.UNAUTHORIZED));

		const tokenVerifier = jest.fn().mockReturnValue({ sub: "3" });
		userService.getUser.mockResolvedValue({ name: "ghost" });
		const middleware2 = createRequireAuthMiddleware({ userService, tokenVerifier });
		await middleware2({ get: jest.fn().mockReturnValue("Bearer token") }, createRes(), next);
		expect(next).toHaveBeenCalledWith(new AppError("User not found", HttpStatus.UNAUTHORIZED));
	});

	test("requireAuth populates request and context on success", async () => {
		const tokenVerifier = jest.fn().mockReturnValue({ sub: "10", aud: "client" });
		const userService = {
			getUser: jest.fn().mockResolvedValue({
				id: 10,
				name: "Jane",
				email: "JANE@EXAMPLE.COM",
				status: "active",
				userRoles: [
					{
						placeId: 2,
						role: {
							id: 9,
							name: "Manager",
							description: undefined,
							rolePermissions: [
								{ permission: { name: "MANAGE_ORDERS" } },
								{ permission: { name: "view_orders" } }
							]
						}
					}
				]
			})
		};
		const middleware = createRequireAuthMiddleware({ userService, tokenVerifier });
		const req = { get: jest.fn().mockReturnValue("Bearer token") };
		const next = jest.fn();

		await middleware(req, createRes(), next);

		expect(req.auth).toEqual({ token: "token", payload: { sub: "10", aud: "client" } });
		expect(req.user.permissions).toEqual(["manage_orders", "view_orders"]);
		expect(req.user.role).toEqual({
			id: 9,
			name: "Manager",
			description: null,
			permissions: ["manage_orders", "view_orders"]
		});
		expect(req.user.placeId).toBe(2);
		expect(next).toHaveBeenCalled();
	});

	test("requireAuth forwards service errors", async () => {
		const tokenVerifier = jest.fn().mockReturnValue({ sub: 5 });
		const userService = { getUser: jest.fn().mockRejectedValue(new Error("db failure")) };
		const middleware = createRequireAuthMiddleware({ userService, tokenVerifier });
		const next = jest.fn();

		await middleware({ get: jest.fn().mockReturnValue("Bearer token") }, createRes(), next);
		expect(next).toHaveBeenCalledWith(expect.any(Error));
	});

	test("authorize middleware enforces authentication and permissions", () => {
		const unauthorized = createAuthorizeMiddleware()("read");
		const next = jest.fn();
		unauthorized({ user: null }, {}, next);
		expect(next).toHaveBeenCalledWith(new AppError("Authentication required", HttpStatus.UNAUTHORIZED));

		const noPerms = createAuthorizeMiddleware()();
		noPerms({ user: { permissions: [] } }, {}, next);
		expect(next).toHaveBeenCalledWith(new AppError("Access denied", HttpStatus.FORBIDDEN));

		const allowedEmpty = createAuthorizeMiddleware()();
		allowedEmpty({ user: { permissions: ["read"] } }, {}, next);
		expect(next).toHaveBeenCalled();

		const denyMissing = createAuthorizeMiddleware()(["write"]);
		const denyNext = jest.fn();
		denyMissing({ user: { permissions: ["read"] } }, {}, denyNext);
		expect(denyNext).toHaveBeenCalledWith(new AppError("Access denied", HttpStatus.FORBIDDEN));

		const allowAlias = createAuthorizeMiddleware()("view_orders");
		const allowNext = jest.fn();
		allowAlias({ user: { role: { permissions: ["manage_orders"] } } }, {}, allowNext);
		expect(allowNext).toHaveBeenCalled();

		const cleaned = createAuthorizeMiddleware()(undefined, "   ");
		const cleanedNext = jest.fn();
		cleaned({ user: { permissions: ["manage_orders"] } }, {}, cleanedNext);
		expect(cleanedNext).toHaveBeenCalled();
	});
});
