import { jest } from "@jest/globals";
import BasePermissionUsecase from "../BasePermissionUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BasePermissionUsecase {}

describe("BasePermissionUsecase", () => {
	let permissionService;

	beforeEach(() => {
		permissionService = { getPermissionByName: jest.fn() };
	});

	test("should throw when service missing", () => {
		expect(() => new BasePermissionUsecase()).toThrow("PERMISSION_USECASE.MISSING_SERVICE");
	});

	test("_normalizeName should trim and lowercase", () => {
		const usecase = new DummyUsecase({ permissionService });
		expect(usecase._normalizeName("  READ ")).toBe("read");
	});

	test("_assertNameAvailable should throw when name missing", async () => {
		const usecase = new DummyUsecase({ permissionService });
		await expect(usecase._assertNameAvailable("   ")).rejects.toThrow(
			new ValidationError("Permission name is required")
		);
	});

	test("_assertNameAvailable should throw when name exists", async () => {
		permissionService.getPermissionByName.mockResolvedValue({ id: 1, name: "read" });
		const usecase = new DummyUsecase({ permissionService });

		await expect(usecase._assertNameAvailable("Read")).rejects.toThrow(
			new ValidationError("Permission read already exists")
		);
	});

	test("_assertNameAvailable should allow when same id", async () => {
		permissionService.getPermissionByName.mockResolvedValue({ id: 2, name: "read" });
		const usecase = new DummyUsecase({ permissionService });

		await expect(usecase._assertNameAvailable("Read", 2)).resolves.toBe("read");
	});

	test("_assertNameAvailable should return normalized when available", async () => {
		permissionService.getPermissionByName.mockResolvedValue(null);
		const usecase = new DummyUsecase({ permissionService });

		await expect(usecase._assertNameAvailable("  Write ")).resolves.toBe("write");
	});
});
