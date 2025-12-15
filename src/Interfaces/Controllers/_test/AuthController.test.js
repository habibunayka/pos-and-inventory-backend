import { jest } from "@jest/globals";
import AuthController from "../AuthController.js";
import HttpStatus from "../../../Commons/Constants/HttpStatus.js";

describe("AuthController", () => {
	const user = { id: 1 };
	let loginUsecase;
	let logoutUsecase;
	let userPresenter;
	let controller;

	beforeEach(() => {
		loginUsecase = { execute: jest.fn().mockResolvedValue({ token: "abc", user }) };
		logoutUsecase = { execute: jest.fn().mockResolvedValue({ status: HttpStatus.CREATED, data: { ok: true } }) };
		userPresenter = { present: jest.fn().mockReturnValue({ id: 1 }) };
		controller = new AuthController({ loginUsecase, logoutUsecase, userPresenter });
	});

	test("should enforce required dependencies", () => {
		expect(() => new AuthController()).toThrow("AUTH_CONTROLLER.MISSING_LOGIN_USECASE");
		expect(() => new AuthController({ logoutUsecase, userPresenter })).toThrow(
			"AUTH_CONTROLLER.MISSING_LOGIN_USECASE"
		);
		expect(() => new AuthController({ loginUsecase, userPresenter })).toThrow(
			"AUTH_CONTROLLER.MISSING_LOGOUT_USECASE"
		);
		expect(() => new AuthController({ loginUsecase, logoutUsecase })).toThrow(
			"AUTH_CONTROLLER.MISSING_USER_PRESENTER"
		);
	});

	test("should login and map presented user", async () => {
		const response = await controller.login({ body: { email: "a@b.com", password: "secret" } });

		expect(loginUsecase.execute).toHaveBeenCalledWith({ email: "a@b.com", password: "secret" });
		expect(userPresenter.present).toHaveBeenCalledWith(user);
		expect(response).toEqual({
			status: HttpStatus.OK,
			data: { token: "abc", tokenType: "Bearer", user: { id: 1 } }
		});
	});

	test("should logout with request user and forward custom result", async () => {
		const response = await controller.logout({ user });

		expect(logoutUsecase.execute).toHaveBeenCalledWith({ user });
		expect(response).toEqual({ status: HttpStatus.CREATED, data: { ok: true } });
	});

	test("should default logout status when usecase omits status", async () => {
		logoutUsecase.execute.mockResolvedValue({ data: { ok: "default" } });

		const response = await controller.logout();

		expect(response).toEqual({ status: HttpStatus.NO_CONTENT, data: { ok: "default" } });
	});

	test("should default logout response when usecase returns falsy", async () => {
		logoutUsecase.execute.mockResolvedValue(null);

		const response = await controller.logout({});

		expect(response).toEqual({ status: HttpStatus.NO_CONTENT });
	});
});
