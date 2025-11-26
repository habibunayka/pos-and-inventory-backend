import { jest } from "@jest/globals";
import DeletePermissionUsecase from "../DeletePermissionUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeletePermissionUsecase", () => {
	let permissionService;
	let usecase;

	beforeEach(() => {
		permissionService = { deletePermission: jest.fn() };
		usecase = new DeletePermissionUsecase({ permissionService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeletePermissionUsecase()).toThrow("PERMISSION_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should delete permission", async () => {
		permissionService.deletePermission.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(permissionService.deletePermission).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
