import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BaseRoleUsecase from "../BaseRoleUsecase.js";
import CreateRoleUsecase from "../CreateRoleUsecase.js";
import DeleteRoleUsecase from "../DeleteRoleUsecase.js";
import UpdateRoleUsecase from "../UpdateRoleUsecase.js";

describe("Roles usecase branch coverage", () => {
	class TestRoleUsecase extends BaseRoleUsecase {
		constructor() {
			super({
				roleService: { getRoleByName: jest.fn(), findPermissionsByNames: jest.fn().mockResolvedValue([]) }
			});
		}
	}

	it("BaseRoleUsecase normalizes null names", () => {
		const usecase = new TestRoleUsecase();
		expect(usecase._normalizeRoleName(null)).toBe("");
		expect(usecase._normalizePermissionName(null)).toBe("");
	});

	it("CreateRoleUsecase handles default payload and permissions", async () => {
		const roleService = {
			getRoleByName: jest.fn().mockResolvedValue(null),
			findPermissionsByNames: jest.fn().mockResolvedValue([]),
			createRole: jest.fn().mockResolvedValue({ id: 1, name: "cashier" })
		};
		const usecase = new CreateRoleUsecase({ roleService });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);

		await usecase.execute({ name: "cashier", permissions: null });
		expect(roleService.createRole).toHaveBeenCalledWith({
			roleData: { name: "cashier", description: null },
			permissionIds: []
		});
	});

	it("DeleteRoleUsecase allows delete when no userRoles", async () => {
		const roleService = {
			getRoleById: jest.fn().mockResolvedValue({ id: 1 }),
			deleteRole: jest.fn().mockResolvedValue({})
		};
		const usecase = new DeleteRoleUsecase({ roleService });
		await usecase.execute(1);
		expect(roleService.deleteRole).toHaveBeenCalledWith(1);
	});

	it("UpdateRoleUsecase handles defaults", async () => {
		const roleService = {
			getRoleById: jest.fn().mockResolvedValue({ id: 1, name: "manager" }),
			updateRole: jest.fn().mockResolvedValue({ id: 1 })
		};
		const usecase = new UpdateRoleUsecase({ roleService });
		await usecase.execute(1);
		expect(roleService.updateRole).toHaveBeenCalledWith({
			id: 1,
			roleData: { name: "manager", description: null },
			permissionIds: []
		});
	});
});
