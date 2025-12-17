import { jest } from "@jest/globals";
import UpdateRoleUsecase from "../UpdateRoleUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";

describe("UpdateRoleUsecase", () => {
	let roleService;
	let usecase;
	let existing;

	beforeEach(() => {
		roleService = {
			getRoleById: jest.fn(),
			getRoleByName: jest.fn(),
			findPermissionsByNames: jest.fn(),
			updateRole: jest.fn()
		};
		existing = {
			id: 1,
			name: "admin",
			description: "desc",
			rolePermissions: [{ permission: { id: 10, name: "read" } }]
		};
		roleService.getRoleById.mockResolvedValue(existing);
		usecase = new UpdateRoleUsecase({ roleService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateRoleUsecase()).toThrow("ROLE_USECASE.MISSING_ROLE_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("Invalid role id"));
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when role not found", async () => {
		roleService.getRoleById.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "admin" })).rejects.toThrow(AppError);
	});

	test("should throw when name is not string", async () => {
		await expect(usecase.execute(1, { name: 123 })).rejects.toThrow(new ValidationError("name must be a string"));
	});

	test("should throw when description invalid", async () => {
		await expect(usecase.execute(1, { description: 123 })).rejects.toThrow(
			new ValidationError("description must be a string")
		);
	});

	test("should throw when permissions invalid", async () => {
		await expect(usecase.execute(1, { permissions: "read" })).rejects.toThrow(
			new ValidationError("permissions must be an array of permission names")
		);
	});

	test("should throw when new name exists", async () => {
		roleService.getRoleByName.mockResolvedValue({ id: 2, name: "admin" });

		await expect(usecase.execute(1, { name: "admin" })).rejects.toThrow(
			new ValidationError("Role admin already exists")
		);
	});

	test("should update role with normalized data", async () => {
		roleService.getRoleByName.mockResolvedValue(null);
		roleService.findPermissionsByNames.mockResolvedValue([{ id: 11, name: "write" }]);
		const updated = { id: 1, name: "manager", rolePermissions: [{ permission: { name: "write" } }] };
		roleService.updateRole.mockResolvedValue(updated);

		const result = await usecase.execute("1", { name: " Manager ", description: "  d ", permissions: ["write"] });

		expect(roleService.updateRole).toHaveBeenCalledWith({
			id: 1,
			roleData: { name: "manager", description: "d" },
			permissionIds: [11]
		});
		expect(result).toMatchObject({ id: 1, name: "manager", permissions: ["write"] });
	});

	test("should allow clearing description explicitly", async () => {
		roleService.getRoleByName.mockResolvedValue(null);
		roleService.findPermissionsByNames.mockResolvedValue([]);
		const updated = { id: 5, name: "cashier", description: null, rolePermissions: [] };
		roleService.updateRole.mockResolvedValue(updated);
		roleService.getRoleById.mockResolvedValue({ ...existing, description: "old" });

		const result = await usecase.execute(5, { description: null });

		expect(roleService.updateRole).toHaveBeenCalledWith({
			id: 5,
			roleData: { name: "admin", description: null },
			permissionIds: [10]
		});
		expect(result).toMatchObject({ id: 5, description: null });
	});

	test("should normalize blank description and handle empty permissions array", async () => {
		roleService.getRoleByName.mockResolvedValue(null);
		roleService.findPermissionsByNames.mockResolvedValue([]);
		roleService.updateRole.mockResolvedValue({ id: 1, name: "admin", description: null, rolePermissions: [] });

		const result = await usecase.execute(1, { description: "   ", permissions: [] });

		expect(roleService.updateRole).toHaveBeenCalledWith({
			id: 1,
			roleData: { name: "admin", description: null },
			permissionIds: []
		});
		expect(result).toMatchObject({ description: null, permissions: [] });
	});
});
