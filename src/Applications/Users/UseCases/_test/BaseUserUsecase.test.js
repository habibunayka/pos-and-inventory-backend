import { jest } from "@jest/globals";
import BaseUserUsecase from "../BaseUserUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseUserUsecase {}

describe("BaseUserUsecase", () => {
	let mockUserService;

	beforeEach(() => {
		mockUserService = {
			findRoleByName: jest.fn(),
			findByEmail: jest.fn()
		};
	});

	test("should throw when userService is missing", () => {
		expect(() => new BaseUserUsecase()).toThrow("USER_USECASE.MISSING_USER_SERVICE");
	});

	test("_findRole should throw when roleName is empty", async () => {
		const usecase = new DummyUsecase({ userService: mockUserService });

		await expect(usecase._findRole("   ")).rejects.toThrow(new ValidationError("roleName is required"));
	});

	test("_findRole should throw when role not found", async () => {
		mockUserService.findRoleByName.mockResolvedValue(null);
		const usecase = new DummyUsecase({ userService: mockUserService });

		await expect(usecase._findRole("manager")).rejects.toThrow(
			new ValidationError("Role manager is not registered")
		);
	});

	test("_findRole should return role when found (normalized)", async () => {
		mockUserService.findRoleByName.mockResolvedValue({ id: 1, name: "Manager" });
		const usecase = new DummyUsecase({ userService: mockUserService });

		const result = await usecase._findRole("  MANAGER ");

		expect(mockUserService.findRoleByName).toHaveBeenCalledWith("manager");
		expect(result).toEqual({ id: 1, name: "Manager" });
	});

	test("_assertEmailAvailable should skip when email missing", async () => {
		const usecase = new DummyUsecase({ userService: mockUserService });

		await expect(usecase._assertEmailAvailable(null)).resolves.toBeUndefined();
		expect(mockUserService.findByEmail).not.toHaveBeenCalled();
	});

	test("_assertEmailAvailable should throw when email taken by another user", async () => {
		mockUserService.findByEmail.mockResolvedValue({ id: 2 });
		const usecase = new DummyUsecase({ userService: mockUserService });

		await expect(usecase._assertEmailAvailable("john@example.com", 1)).rejects.toThrow(
			new ValidationError("Email is already in use")
		);
	});

	test("_assertEmailAvailable should pass when email belongs to same user", async () => {
		mockUserService.findByEmail.mockResolvedValue({ id: 1 });
		const usecase = new DummyUsecase({ userService: mockUserService });

		await expect(usecase._assertEmailAvailable("john@example.com", 1)).resolves.toBeUndefined();
	});

	test("_validatePin should throw on invalid pin", () => {
		const usecase = new DummyUsecase({ userService: mockUserService });

		expect(() => usecase._validatePin("12")).toThrow(
			new ValidationError("PIN must be a numeric string with 4 to 6 digits")
		);
		expect(() => usecase._validatePin("abcd")).toThrow(
			new ValidationError("PIN must be a numeric string with 4 to 6 digits")
		);
	});

	test("_validatePassword should throw when too short", () => {
		const usecase = new DummyUsecase({ userService: mockUserService });

		expect(() => usecase._validatePassword("short")).toThrow(
			new ValidationError("Password must be at least 8 characters long")
		);
	});

	test("_assertPlaceExists should return null when placeId not provided", async () => {
		const usecase = new DummyUsecase({ userService: mockUserService });

		await expect(usecase._assertPlaceExists(undefined)).resolves.toBeNull();
	});

	test("_assertPlaceExists should throw when placeId invalid", async () => {
		const usecase = new DummyUsecase({ userService: mockUserService, placeService: { getPlace: jest.fn() } });

		await expect(usecase._assertPlaceExists("abc")).rejects.toThrow(
			new ValidationError("Place id must be a positive integer")
		);
	});

	test("_assertPlaceExists should throw when placeService missing for provided placeId", async () => {
		const usecase = new DummyUsecase({ userService: mockUserService });

		await expect(usecase._assertPlaceExists(1)).rejects.toThrow("USER_USECASE.MISSING_PLACE_SERVICE");
	});

	test("_assertPlaceExists should return id when validation disabled", async () => {
		const placeService = { getPlace: jest.fn(), supportsPlaceValidation: false };
		const usecase = new DummyUsecase({ userService: mockUserService, placeService });

		await expect(usecase._assertPlaceExists("2")).resolves.toBe(2);
		expect(placeService.getPlace).not.toHaveBeenCalled();
	});

	test("_assertPlaceExists should throw when place not found", async () => {
		const placeService = { getPlace: jest.fn().mockResolvedValue(null) };
		const usecase = new DummyUsecase({ userService: mockUserService, placeService });

		await expect(usecase._assertPlaceExists(3)).rejects.toThrow(new ValidationError("Place not found"));
		expect(placeService.getPlace).toHaveBeenCalledWith(3);
	});

	test("_assertPlaceExists should return id when place exists", async () => {
		const placeService = { getPlace: jest.fn().mockResolvedValue({ id: 4 }), supportsPlaceValidation: true };
		const usecase = new DummyUsecase({ userService: mockUserService, placeService });

		await expect(usecase._assertPlaceExists(4)).resolves.toBe(4);
	});
});
