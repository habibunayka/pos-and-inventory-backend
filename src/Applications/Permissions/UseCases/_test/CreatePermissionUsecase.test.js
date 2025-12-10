import { jest } from "@jest/globals";
import CreatePermissionUsecase from "../CreatePermissionUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreatePermissionUsecase", () => {
	let permissionService;
	let usecase;

	beforeEach(() => {
		permissionService = { getPermissionByName: jest.fn(), createPermission: jest.fn() };
		usecase = new CreatePermissionUsecase({ permissionService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreatePermissionUsecase()).toThrow("PERMISSION_USECASE.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should require name", async () => {
		await expect(usecase.execute({ name: "   " })).rejects.toThrow(new ValidationError("Permission name is required"));
	});

	test("should throw when name exists", async () => {
		permissionService.getPermissionByName.mockResolvedValue({ id: 1, name: "read" });

		await expect(usecase.execute({ name: "Read" })).rejects.toThrow(
			new ValidationError("Permission read already exists")
		);
	});

	test("should throw when description invalid", async () => {
		permissionService.getPermissionByName.mockResolvedValue(null);

		await expect(usecase.execute({ name: "read", description: 123 })).rejects.toThrow(
			new ValidationError("description must be a string")
		);
	});

	test("should allow null description", async () => {
		permissionService.getPermissionByName.mockResolvedValue(null);
		const created = { id: 7, name: "read", description: null };
		permissionService.createPermission.mockResolvedValue(created);

		const result = await usecase.execute({ name: "read", description: null });

		expect(permissionService.createPermission).toHaveBeenCalledWith({ name: "read", description: null });
		expect(result).toEqual(created);
	});

	test("should create permission with normalized data", async () => {
		permissionService.getPermissionByName.mockResolvedValue(null);
		const created = { id: 2, name: "read" };
		permissionService.createPermission.mockResolvedValue(created);

		const result = await usecase.execute({ name: " Read ", description: "  desc " });

		expect(permissionService.createPermission).toHaveBeenCalledWith({ name: "read", description: "desc" });
		expect(result).toEqual(created);
	});
});
