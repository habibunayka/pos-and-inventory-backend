import { jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";

const hashSecretMock = jest.fn().mockResolvedValue("hashed-secret");

jest.unstable_mockModule("../../../../Commons/Utils/HashPassword.js", () => ({
	hashSecret: hashSecretMock
}));

const { default: UpdateUserUsecase } = await import("../UpdateUserUsecase.js");

describe("UpdateUserUsecase", () => {
	let mockUserService;
	let mockPlaceService;
	let existingManagedRecord;
	let existingCashierRecord;

	beforeEach(() => {
		mockUserService = {
			getUser: jest.fn(),
			findRoleByName: jest.fn(),
			findByEmail: jest.fn(),
			updateUser: jest.fn()
		};
		mockPlaceService = { getPlace: jest.fn(), supportsPlaceValidation: true };
		existingManagedRecord = {
			id: 5,
			name: "Existing",
			email: "old@example.com",
			status: "active",
			pinCodeHash: null,
			userRoles: [{ id: 1, role: { id: 3, name: "manager" }, placeId: 10 }]
		};
		existingCashierRecord = {
			id: 6,
			name: "Cash",
			email: null,
			status: "active",
			pinCodeHash: "hashed-pin",
			userRoles: [{ id: 2, role: { id: 1, name: "cashier" }, placeId: null }]
		};
		jest.clearAllMocks();
	});

	test("should throw when userService missing", () => {
		expect(() => new UpdateUserUsecase()).toThrow("USER_USECASE.MISSING_USER_SERVICE");
	});

	test("should throw when id is invalid", async () => {
		const usecase = new UpdateUserUsecase({ userService: mockUserService });

		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("Invalid user id"));
	});

	test("should throw when user not found", async () => {
		mockUserService.getUser.mockResolvedValue(null);
		const usecase = new UpdateUserUsecase({ userService: mockUserService });

		await expect(usecase.execute(1, {})).rejects.toThrow(AppError);
	});

	test("should throw when moving cashier to non-cashier without password", async () => {
		mockUserService.getUser.mockResolvedValue(existingCashierRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 3, name: "manager" });
		const usecase = new UpdateUserUsecase({ userService: mockUserService });

		await expect(
			usecase.execute(6, { roleName: "manager", email: "manager@example.com" })
		).rejects.toThrow(new ValidationError("Password is required when moving a cashier to a non-cashier role"));
	});

	test("should throw when email already in use for non-cashier", async () => {
		mockUserService.getUser.mockResolvedValue(existingManagedRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 3, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue({ id: 99 });
		const usecase = new UpdateUserUsecase({ userService: mockUserService });

		await expect(
			usecase.execute(5, { email: "new@example.com", password: "password1", roleName: "manager" })
		).rejects.toThrow(new ValidationError("Email is already in use"));
	});

	test("should throw when cashier provides email or password", async () => {
		mockUserService.getUser.mockResolvedValue(existingManagedRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 1, name: "cashier" });
		mockPlaceService.getPlace.mockResolvedValue({ id: 10 });
		const usecase = new UpdateUserUsecase({ userService: mockUserService, placeService: mockPlaceService });

		await expect(
			usecase.execute(5, { roleName: "cashier", email: "cash@example.com" })
		).rejects.toThrow(new ValidationError("Cashier accounts cannot have email or password"));
	});

	test("should require pin when switching to cashier role", async () => {
		mockUserService.getUser.mockResolvedValue(existingManagedRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 1, name: "cashier" });
		mockPlaceService.getPlace.mockResolvedValue({ id: 10 });
		const usecase = new UpdateUserUsecase({ userService: mockUserService, placeService: mockPlaceService });

		await expect(usecase.execute(5, { roleName: "cashier" })).rejects.toThrow(
			new ValidationError("Cashier accounts require a PIN")
		);
	});

	test("should forbid pin on non-cashier roles", async () => {
		mockUserService.getUser.mockResolvedValue(existingManagedRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 3, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue(null);
		mockPlaceService.getPlace.mockResolvedValue({ id: 10 });
		const usecase = new UpdateUserUsecase({ userService: mockUserService, placeService: mockPlaceService });

		await expect(usecase.execute(5, { roleName: "manager", pin: "1234" })).rejects.toThrow(
			new ValidationError("Non-cashier accounts must not define PIN codes")
		);
	});

	test("should require email when moving cashier to non-cashier", async () => {
		mockUserService.getUser.mockResolvedValue(existingCashierRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 3, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue(null);
		const usecase = new UpdateUserUsecase({ userService: mockUserService });

		await expect(usecase.execute(6, { roleName: "manager", password: "password1" })).rejects.toThrow(
			new ValidationError("Email is required for non-cashier roles")
		);
	});

	test("should throw when place validation fails", async () => {
		mockUserService.getUser.mockResolvedValue(existingManagedRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 3, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue(null);
		mockPlaceService.getPlace.mockResolvedValue(null);
		const usecase = new UpdateUserUsecase({ userService: mockUserService, placeService: mockPlaceService });

		await expect(
			usecase.execute(5, { roleName: "manager", email: "old@example.com", password: "password1", placeId: 20 })
		).rejects.toThrow(new ValidationError("Place not found"));
	});

	test("should update status when provided", async () => {
		mockUserService.getUser.mockResolvedValue(existingManagedRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 3, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue(null);
		mockPlaceService.getPlace.mockResolvedValue({ id: 10 });
		const updatedRecord = { ...existingManagedRecord, status: "inactive" };
		mockUserService.updateUser.mockResolvedValue(updatedRecord);
		const usecase = new UpdateUserUsecase({ userService: mockUserService, placeService: mockPlaceService });

		const result = await usecase.execute(5, { status: "inactive" });

		expect(mockUserService.updateUser).toHaveBeenCalledWith({
			id: 5,
			userData: { status: "inactive", email: "old@example.com", pinCodeHash: null },
			roleId: 3,
			placeId: 10
		});
		expect(result.status).toBe("inactive");
	});

	test("should update non-cashier user with hashed password", async () => {
		mockUserService.getUser.mockResolvedValue(existingManagedRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 3, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue(null);
		mockPlaceService.getPlace.mockResolvedValue({ id: 10 });
		const updatedRecord = {
			...existingManagedRecord,
			name: "New",
			email: "old@example.com",
			pinCodeHash: null
		};
		mockUserService.updateUser.mockResolvedValue(updatedRecord);
		const usecase = new UpdateUserUsecase({ userService: mockUserService, placeService: mockPlaceService });

		const result = await usecase.execute(5, { name: "New", password: "newpassword", roleName: "manager" });

		expect(mockUserService.updateUser).toHaveBeenCalledWith({
			id: 5,
			userData: {
				name: "New",
				email: "old@example.com",
				passwordHash: "hashed-secret",
				pinCodeHash: null
			},
			roleId: 3,
			placeId: 10
		});
		expect(result).toMatchObject({ id: 5, name: "New", authenticationMethod: "password" });
	});

	test("should update cashier user with hashed pin", async () => {
		mockUserService.getUser.mockResolvedValue(existingManagedRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 1, name: "cashier" });
		const updatedRecord = {
			id: 5,
			name: "Cash",
			email: null,
			status: "active",
			pinCodeHash: "hashed-secret",
			userRoles: [{ role: { id: 1, name: "cashier" }, placeId: 10 }]
		};
		mockUserService.updateUser.mockResolvedValue(updatedRecord);
		mockPlaceService.getPlace.mockResolvedValue({ id: 10 });
		const usecase = new UpdateUserUsecase({ userService: mockUserService, placeService: mockPlaceService });

		const result = await usecase.execute(5, { roleName: "cashier", pin: "1234" });

		expect(hashSecretMock).toHaveBeenCalledWith("1234");
		expect(mockUserService.updateUser).toHaveBeenCalledWith({
			id: 5,
			userData: {
				email: null,
				passwordHash: null,
				pinCodeHash: "hashed-secret"
			},
			roleId: 1,
			placeId: 10
		});
		expect(result.authenticationMethod).toBe("pin");
	});

	test("should map place FK errors when updating user", async () => {
		mockUserService.getUser.mockResolvedValue(existingManagedRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 3, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue(null);
		mockPlaceService.getPlace.mockResolvedValue({ id: 10 });
		mockUserService.updateUser.mockRejectedValue({
			code: "P2003",
			meta: { constraint: "user_roles_place_id_fkey" }
		});
		const usecase = new UpdateUserUsecase({ userService: mockUserService, placeService: mockPlaceService });

		await expect(usecase.execute(5, { roleName: "manager", email: "old@example.com", password: "password1" })).rejects.toThrow(
			new ValidationError("Place not found")
		);
	});

	test("should rethrow unexpected update errors", async () => {
		mockUserService.getUser.mockResolvedValue(existingManagedRecord);
		mockUserService.findRoleByName.mockResolvedValue({ id: 3, name: "manager" });
		mockUserService.findByEmail.mockResolvedValue(null);
		mockPlaceService.getPlace.mockResolvedValue({ id: 10 });
		const failure = new Error("update failed");
		mockUserService.updateUser.mockRejectedValue(failure);
		const usecase = new UpdateUserUsecase({ userService: mockUserService, placeService: mockPlaceService });

		await expect(
			usecase.execute(5, { roleName: "manager", email: "old@example.com", password: "password1" })
		).rejects.toThrow(failure);
	});
});
