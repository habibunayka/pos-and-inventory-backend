import { jest } from "@jest/globals";
import ListPermissionsUsecase from "../ListPermissionsUsecase.js";

describe("ListPermissionsUsecase", () => {
	let permissionService;
	let usecase;

	beforeEach(() => {
		permissionService = { listPermissions: jest.fn() };
		usecase = new ListPermissionsUsecase({ permissionService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListPermissionsUsecase()).toThrow("PERMISSION_USECASE.MISSING_SERVICE");
	});

	test("should list permissions", async () => {
		const records = [{ id: 1 }];
		permissionService.listPermissions.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(permissionService.listPermissions).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
