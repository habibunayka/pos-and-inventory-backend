import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreatePermissionUsecase from "../CreatePermissionUsecase.js";
import UpdatePermissionUsecase from "../UpdatePermissionUsecase.js";

describe("Permissions usecase branch coverage", () => {
	it("CreatePermissionUsecase default arg branch", async () => {
		const service = { getPermissionByName: jest.fn().mockResolvedValue(null), createPermission: jest.fn() };
		const usecase = new CreatePermissionUsecase({ permissionService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreatePermissionUsecase handles missing/blank description branches", async () => {
		const permissionService = {
			getPermissionByName: jest.fn().mockResolvedValue(null),
			createPermission: jest.fn()
		};
		const usecase = new CreatePermissionUsecase({ permissionService });

		await usecase.execute({ name: "view" });
		expect(permissionService.createPermission).toHaveBeenCalledWith({ name: "view", description: null });

		await usecase.execute({ name: "edit", description: "   " });
		expect(permissionService.createPermission).toHaveBeenLastCalledWith({ name: "edit", description: null });
	});

	it("UpdatePermissionUsecase handles description and defaults", async () => {
		const permissionService = {
			getPermission: jest.fn().mockResolvedValue({ id: 1 }),
			updatePermission: jest.fn().mockResolvedValue({ id: 1 })
		};
		const usecase = new UpdatePermissionUsecase({ permissionService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);

		await usecase.execute(1, { description: "   " });
		expect(permissionService.updatePermission).toHaveBeenCalledWith({
			id: 1,
			permissionData: { description: null }
		});
	});
});
