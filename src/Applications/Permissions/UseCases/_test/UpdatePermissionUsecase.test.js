import { jest } from "@jest/globals";
import UpdatePermissionUsecase from "../UpdatePermissionUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdatePermissionUsecase", () => {
	let permissionService;
	let usecase;

	beforeEach(() => {
		permissionService = {
			getPermissionByName: jest.fn(),
			getPermission: jest.fn(),
			updatePermission: jest.fn()
		};
		permissionService.getPermission.mockResolvedValue({ id: 1, name: "read" });
		usecase = new UpdatePermissionUsecase({ permissionService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdatePermissionUsecase()).toThrow("PERMISSION_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when record not found", async () => {
		permissionService.getPermission.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "write" })).rejects.toThrow(
			new ValidationError("Permission not found")
		);
	});

	test("should throw when name exists", async () => {
		permissionService.getPermissionByName.mockResolvedValue({ id: 2, name: "read" });

		await expect(usecase.execute(1, { name: "read" })).rejects.toThrow(
			new ValidationError("Permission read already exists")
		);
	});

	test("should throw when description invalid", async () => {
		await expect(usecase.execute(1, { description: 123 })).rejects.toThrow(
			new ValidationError("description must be a string")
		);
	});

	test("should throw when no updatable fields", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No updatable fields provided"));
	});

	test("should update permission with normalized data", async () => {
		permissionService.getPermissionByName.mockResolvedValue(null);
		const updated = { id: 1, name: "write" };
		permissionService.updatePermission.mockResolvedValue(updated);

		const result = await usecase.execute("1", { name: " Write ", description: "  desc " });

		expect(permissionService.updatePermission).toHaveBeenCalledWith({
			id: 1,
			permissionData: { name: "write", description: "desc" }
		});
		expect(result).toEqual(updated);
	});
});
