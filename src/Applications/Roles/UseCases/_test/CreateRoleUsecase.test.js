import { jest } from "@jest/globals";
import CreateRoleUsecase from "../CreateRoleUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateRoleUsecase", () => {
	let roleService;
	let usecase;

	beforeEach(() => {
		roleService = {
			getRoleByName: jest.fn(),
			findPermissionsByNames: jest.fn(),
			createRole: jest.fn()
		};
		usecase = new CreateRoleUsecase({ roleService });
	});

	test("should throw when roleService missing", () => {
		expect(() => new CreateRoleUsecase()).toThrow("ROLE_USECASE.MISSING_ROLE_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when name is not string", async () => {
		await expect(usecase.execute({ name: 123 })).rejects.toThrow(new ValidationError("name must be a string"));
	});

	test("should throw when role name invalid", async () => {
		await expect(usecase.execute({ name: "unknown" })).rejects.toThrow(
			new ValidationError("Role name must be one of: admin, manager, cashier")
		);
	});

	test("should throw when description invalid", async () => {
		roleService.getRoleByName.mockResolvedValue(null);
		await expect(usecase.execute({ name: "admin", description: 123 })).rejects.toThrow(
			new ValidationError("description must be a string")
		);
	});

	test("should throw when permissions missing or invalid", async () => {
		roleService.getRoleByName.mockResolvedValue(null);
		roleService.findPermissionsByNames.mockResolvedValue([]);

		await expect(usecase.execute({ name: "admin", permissions: ["invalid"] })).rejects.toThrow(
			new ValidationError("Some permissions are not registered", { missing: ["invalid"] })
		);
	});

	test("should create role with normalized data", async () => {
		roleService.getRoleByName.mockResolvedValue(null);
		roleService.findPermissionsByNames.mockResolvedValue([{ id: 10, name: "read" }]);
		const created = { id: 2, name: "admin", rolePermissions: [{ permission: { name: "read" } }] };
		roleService.createRole.mockResolvedValue(created);

		const result = await usecase.execute({ name: "  ADMIN ", description: "  desc ", permissions: ["READ", "read"] });

		expect(roleService.createRole).toHaveBeenCalledWith({
			roleData: { name: "admin", description: "desc" },
			permissionIds: [10]
		});
		expect(result).toMatchObject({ id: 2, name: "admin", permissions: ["read"] });
	});
});
