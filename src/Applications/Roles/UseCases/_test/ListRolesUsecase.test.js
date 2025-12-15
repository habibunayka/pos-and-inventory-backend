import { jest } from "@jest/globals";
import ListRolesUsecase from "../ListRolesUsecase.js";

describe("ListRolesUsecase", () => {
	let roleService;
	let usecase;

	beforeEach(() => {
		roleService = { listRoles: jest.fn() };
		usecase = new ListRolesUsecase({ roleService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListRolesUsecase()).toThrow("ROLE_USECASE.MISSING_ROLE_SERVICE");
	});

	test("should list roles", async () => {
		const records = [
			{ id: 1, name: "admin", rolePermissions: [{ permission: { name: "read" } }] },
			{ id: 2, name: "cashier", rolePermissions: [] }
		];
		roleService.listRoles.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(roleService.listRoles).toHaveBeenCalledTimes(1);
		expect(result[0]).toMatchObject({ id: 1, permissions: ["read"] });
		expect(result[1]).toMatchObject({ id: 2, permissions: [] });
	});
});
