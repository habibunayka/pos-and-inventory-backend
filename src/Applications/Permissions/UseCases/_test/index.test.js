import * as usecases from "../index.js";
import ListPermissionsUsecase from "../ListPermissionsUsecase.js";
import GetPermissionUsecase from "../GetPermissionUsecase.js";
import CreatePermissionUsecase from "../CreatePermissionUsecase.js";
import UpdatePermissionUsecase from "../UpdatePermissionUsecase.js";
import DeletePermissionUsecase from "../DeletePermissionUsecase.js";

describe("Permissions Usecases index exports", () => {
	test("should export ListPermissionsUsecase", () => {
		expect(usecases.ListPermissionsUsecase).toBe(ListPermissionsUsecase);
	});

	test("should export GetPermissionUsecase", () => {
		expect(usecases.GetPermissionUsecase).toBe(GetPermissionUsecase);
	});

	test("should export CreatePermissionUsecase", () => {
		expect(usecases.CreatePermissionUsecase).toBe(CreatePermissionUsecase);
	});

	test("should export UpdatePermissionUsecase", () => {
		expect(usecases.UpdatePermissionUsecase).toBe(UpdatePermissionUsecase);
	});

	test("should export DeletePermissionUsecase", () => {
		expect(usecases.DeletePermissionUsecase).toBe(DeletePermissionUsecase);
	});
});
