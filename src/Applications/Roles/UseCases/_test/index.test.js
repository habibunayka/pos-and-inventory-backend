import * as usecases from "../index.js";
import ListRolesUsecase from "../ListRolesUsecase.js";
import GetRoleUsecase from "../GetRoleUsecase.js";
import CreateRoleUsecase from "../CreateRoleUsecase.js";
import UpdateRoleUsecase from "../UpdateRoleUsecase.js";
import DeleteRoleUsecase from "../DeleteRoleUsecase.js";

describe("Roles Usecases index exports", () => {
	test("should export ListRolesUsecase", () => {
		expect(usecases.ListRolesUsecase).toBe(ListRolesUsecase);
	});

	test("should export GetRoleUsecase", () => {
		expect(usecases.GetRoleUsecase).toBe(GetRoleUsecase);
	});

	test("should export CreateRoleUsecase", () => {
		expect(usecases.CreateRoleUsecase).toBe(CreateRoleUsecase);
	});

	test("should export UpdateRoleUsecase", () => {
		expect(usecases.UpdateRoleUsecase).toBe(UpdateRoleUsecase);
	});

	test("should export DeleteRoleUsecase", () => {
		expect(usecases.DeleteRoleUsecase).toBe(DeleteRoleUsecase);
	});
});
