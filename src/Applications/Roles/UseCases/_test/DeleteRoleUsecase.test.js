import { jest } from "@jest/globals";
import DeleteRoleUsecase from "../DeleteRoleUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";

describe("DeleteRoleUsecase", () => {
	let roleService;
	let usecase;

	beforeEach(() => {
		roleService = { getRoleById: jest.fn(), deleteRole: jest.fn() };
		roleService.getRoleById.mockResolvedValue({ id: 1, userRoles: [] });
		usecase = new DeleteRoleUsecase({ roleService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteRoleUsecase()).toThrow("ROLE_USECASE.MISSING_ROLE_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid role id"));
	});

	test("should throw when role not found", async () => {
		roleService.getRoleById.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should throw when role has user assignments", async () => {
		roleService.getRoleById.mockResolvedValue({ id: 1, userRoles: [{}] });

		await expect(usecase.execute(1)).rejects.toThrow(
			new ValidationError("Role cannot be deleted while assigned to users")
		);
	});

	test("should delete role when valid", async () => {
		roleService.deleteRole.mockResolvedValue(true);

		await usecase.execute("2");

		expect(roleService.deleteRole).toHaveBeenCalledWith(2);
	});
});
