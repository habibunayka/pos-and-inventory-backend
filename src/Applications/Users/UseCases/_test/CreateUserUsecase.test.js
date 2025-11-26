import { jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

const hashSecretMock = jest.fn().mockResolvedValue("hashed-secret");

jest.unstable_mockModule("../../../../Commons/Utils/HashPassword.js", () => ({
	hashSecret: hashSecretMock
}));

const { default: CreateUserUsecase } = await import("../CreateUserUsecase.js");

describe("CreateUserUsecase", () => {
	let mockUserService;
	let mockPlaceService;

	beforeEach(() => {
		mockUserService = {
			findRoleByName: jest.fn(),
			findByEmail: jest.fn(),
			createUser: jest.fn()
		};
		mockPlaceService = { getPlace: jest.fn(), supportsPlaceValidation: true };
		jest.clearAllMocks();
	});

	test("should throw when userService is missing", () => {
		expect(() => new CreateUserUsecase()).toThrow("USER_USECASE.MISSING_USER_SERVICE");
	});

	test("should throw when name or roleName is missing", async () => {
		const usecase = new CreateUserUsecase({ userService: mockUserService });

		await expect(usecase.execute({})).rejects.toThrow(new ValidationError("Name and roleName are required"));
		await expect(usecase.execute({ name: "John" })).rejects.toThrow(
			new ValidationError("Name and roleName are required")
		);
	});

	test("should throw when role is not found", async () => {
		mockUserService.findRoleByName.mockResolvedValue(null);
		const usecase = new CreateUserUsecase({ userService: mockUserService });

		await expect(usecase.execute({ name: "John", roleName: "manager" })).rejects.toThrow(
			new ValidationError("Role manager is not registered")
		);
	});

	test("should throw when email already used for non-cashier", async () => {
		mockUserService.findRoleByName.mockResolvedValue({ id: 1, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue({ id: 5 });
		const usecase = new CreateUserUsecase({ userService: mockUserService });

		await expect(
			usecase.execute({ name: "John", roleName: "manager", email: "john@example.com", password: "password1" })
		).rejects.toThrow(new ValidationError("Email is already in use"));
	});

	test("should throw when password too short for non-cashier", async () => {
		mockUserService.findRoleByName.mockResolvedValue({ id: 1, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue(null);
		const usecase = new CreateUserUsecase({ userService: mockUserService });

		await expect(
			usecase.execute({ name: "John", roleName: "manager", email: "john@example.com", password: "short" })
		).rejects.toThrow(new ValidationError("Password must be at least 8 characters long"));
	});

	test("should create non-cashier user with hashed password", async () => {
		mockUserService.findRoleByName.mockResolvedValue({ id: 2, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue(null);
		const createdRecord = {
			id: 10,
			name: "John",
			email: "john@example.com",
			status: "active",
			pinCodeHash: null,
			userRoles: [{ role: { id: 2, name: "manager" }, placeId: 5 }]
		};
		mockUserService.createUser.mockResolvedValue(createdRecord);
		const usecase = new CreateUserUsecase({ userService: mockUserService, placeService: mockPlaceService });
		mockPlaceService.getPlace.mockResolvedValue({ id: 5 });

		const result = await usecase.execute({
			name: "John",
			roleName: "manager",
			email: "JOHN@example.com",
			password: "password1",
			placeId: 5
		});

		expect(mockUserService.createUser).toHaveBeenCalledWith({
			userData: {
				name: "John",
				status: "active",
				email: "john@example.com",
				passwordHash: "hashed-secret",
				pinCodeHash: null
			},
			roleId: 2,
			placeId: 5
		});
		expect(result).toMatchObject({ id: 10, email: "john@example.com", authenticationMethod: "password" });
	});

	test("should throw when cashier receives email or password", async () => {
		mockUserService.findRoleByName.mockResolvedValue({ id: 1, name: "cashier" });
		const usecase = new CreateUserUsecase({ userService: mockUserService });

		await expect(
			usecase.execute({ name: "Cash", roleName: "cashier", email: "cash@example.com", pin: "1234" })
		).rejects.toThrow(new ValidationError("Cashier accounts cannot have email or password"));
	});

	test("should throw when cashier PIN invalid", async () => {
		mockUserService.findRoleByName.mockResolvedValue({ id: 1, name: "cashier" });
		const usecase = new CreateUserUsecase({ userService: mockUserService });

		await expect(usecase.execute({ name: "Cash", roleName: "cashier", pin: "12" })).rejects.toThrow(
			new ValidationError("PIN must be a numeric string with 4 to 6 digits")
		);
	});

	test("should create cashier user with hashed pin and null email/password", async () => {
		mockUserService.findRoleByName.mockResolvedValue({ id: 1, name: "cashier" });
		const createdRecord = {
			id: 8,
			name: "Cash",
			email: null,
			status: "active",
			pinCodeHash: "hashed-secret",
			userRoles: [{ role: { id: 1, name: "cashier" }, placeId: null }]
		};
		mockUserService.createUser.mockResolvedValue(createdRecord);
		const usecase = new CreateUserUsecase({ userService: mockUserService });

		const result = await usecase.execute({ name: " Cash ", roleName: "cashier", pin: "1234" });

		expect(hashSecretMock).toHaveBeenCalledWith("1234");
		expect(mockUserService.createUser).toHaveBeenCalledWith({
			userData: {
				name: "Cash",
				status: "active",
				email: null,
				passwordHash: null,
				pinCodeHash: "hashed-secret"
			},
			roleId: 1,
			placeId: null
		});
		expect(result.authenticationMethod).toBe("pin");
	});

	test("should throw when place validation fails", async () => {
		mockUserService.findRoleByName.mockResolvedValue({ id: 2, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue(null);
		mockPlaceService.getPlace.mockResolvedValue(null);
		const usecase = new CreateUserUsecase({ userService: mockUserService, placeService: mockPlaceService });

		await expect(
			usecase.execute({
				name: "John",
				roleName: "manager",
				email: "john@example.com",
				password: "password1",
				placeId: 99
			})
		).rejects.toThrow(new ValidationError("Place not found"));
	});

	test("should throw when placeId provided but placeService missing", async () => {
		mockUserService.findRoleByName.mockResolvedValue({ id: 2, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue(null);
		const usecase = new CreateUserUsecase({ userService: mockUserService });

		await expect(
			usecase.execute({
				name: "John",
				roleName: "manager",
				email: "john@example.com",
				password: "password1",
				placeId: 1
			})
		).rejects.toThrow("USER_USECASE.MISSING_PLACE_SERVICE");
	});
});
