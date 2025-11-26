import { jest } from "@jest/globals";
import BaseRoleUsecase from "../BaseRoleUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import { SYSTEM_ROLE_NAMES } from "../../../../Commons/Constants/SystemRoles.js";

class DummyUsecase extends BaseRoleUsecase {}

describe("BaseRoleUsecase", () => {
	let roleService;

	beforeEach(() => {
		roleService = {
			getRoleByName: jest.fn(),
			findPermissionsByNames: jest.fn()
		};
	});

	test("should throw when roleService missing", () => {
		expect(() => new BaseRoleUsecase()).toThrow("ROLE_USECASE.MISSING_ROLE_SERVICE");
	});

	test("_normalizeRoleName should trim/lowercase", () => {
		const usecase = new DummyUsecase({ roleService });
		expect(usecase._normalizeRoleName("  Admin ")).toBe("admin");
	});

	test("_assertNameAvailable should validate role names against system list", async () => {
		const usecase = new DummyUsecase({ roleService });
		await expect(usecase._assertNameAvailable("invalid")).rejects.toThrow(
			new ValidationError(`Role name must be one of: ${SYSTEM_ROLE_NAMES.join(", ")}`)
		);
	});

	test("_assertNameAvailable should throw when existing different id", async () => {
		roleService.getRoleByName.mockResolvedValue({ id: 2, name: "admin" });
		const usecase = new DummyUsecase({ roleService });

		await expect(usecase._assertNameAvailable("admin", 1)).rejects.toThrow(
			new ValidationError("Role admin already exists")
		);
	});

	test("_assertNameAvailable should return normalized when available", async () => {
		roleService.getRoleByName.mockResolvedValue(null);
		const usecase = new DummyUsecase({ roleService });

		await expect(usecase._assertNameAvailable(" Admin ")).resolves.toBe("admin");
	});

	test("_resolvePermissions should allow null/undefined", async () => {
		const usecase = new DummyUsecase({ roleService });
		await expect(usecase._resolvePermissions(undefined)).resolves.toEqual({ names: [], records: [] });
	});

	test("_resolvePermissions should throw on non-array", async () => {
		const usecase = new DummyUsecase({ roleService });
		await expect(usecase._resolvePermissions("read")).rejects.toThrow(
			new ValidationError("permissions must be an array of permission names")
		);
	});

	test("_resolvePermissions should throw when no valid names provided", async () => {
		const usecase = new DummyUsecase({ roleService });
		await expect(usecase._resolvePermissions(["   "])).rejects.toThrow(
			new ValidationError("permissions must contain valid permission names")
		);
	});

	test("_resolvePermissions should throw when missing permissions", async () => {
		roleService.findPermissionsByNames.mockResolvedValue([]);
		const usecase = new DummyUsecase({ roleService });

		await expect(usecase._resolvePermissions(["read"])).rejects.toThrow(
			new ValidationError("Some permissions are not registered", { missing: ["read"] })
		);
	});

	test("_resolvePermissions should return unique normalized permissions", async () => {
		roleService.findPermissionsByNames.mockResolvedValue([{ name: "read" }, { name: "write" }]);
		const usecase = new DummyUsecase({ roleService });

		const result = await usecase._resolvePermissions([" Read ", "write", "READ"]);

		expect(roleService.findPermissionsByNames).toHaveBeenCalledWith(["read", "write"]);
		expect(result).toEqual({ names: ["read", "write"], records: [{ name: "read" }, { name: "write" }] });
	});
});
