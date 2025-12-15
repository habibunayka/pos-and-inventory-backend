import { jest } from "@jest/globals";
import GetRoleUsecase from "../GetRoleUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";

describe("GetRoleUsecase", () => {
	let roleService;
	let usecase;

	beforeEach(() => {
		roleService = { getRoleById: jest.fn() };
		usecase = new GetRoleUsecase({ roleService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetRoleUsecase()).toThrow("ROLE_USECASE.MISSING_ROLE_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid role id"));
	});

	test("should throw when role not found", async () => {
		roleService.getRoleById.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should return role when found", async () => {
		roleService.getRoleById.mockResolvedValue({ id: 2, name: "admin", rolePermissions: [] });

		const result = await usecase.execute("2");

		expect(roleService.getRoleById).toHaveBeenCalledWith(2);
		expect(result).toMatchObject({ id: 2, name: "admin" });
	});
});
