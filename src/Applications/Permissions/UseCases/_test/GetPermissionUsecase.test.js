import { jest } from "@jest/globals";
import GetPermissionUsecase from "../GetPermissionUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetPermissionUsecase", () => {
	let permissionService;
	let usecase;

	beforeEach(() => {
		permissionService = { getPermission: jest.fn() };
		usecase = new GetPermissionUsecase({ permissionService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetPermissionUsecase()).toThrow("PERMISSION_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when permission not found", async () => {
		permissionService.getPermission.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Permission not found"));
	});

	test("should return permission when found", async () => {
		permissionService.getPermission.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(permissionService.getPermission).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
