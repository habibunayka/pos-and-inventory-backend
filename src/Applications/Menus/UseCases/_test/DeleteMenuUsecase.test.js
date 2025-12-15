import { jest } from "@jest/globals";
import DeleteMenuUsecase from "../DeleteMenuUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteMenuUsecase", () => {
	let menuService;
	let usecase;

	beforeEach(() => {
		menuService = { deleteMenu: jest.fn() };
		usecase = new DeleteMenuUsecase({ menuService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteMenuUsecase()).toThrow("MENU_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		menuService.deleteMenu.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Menu not found"));
	});

	test("should delete menu", async () => {
		menuService.deleteMenu.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(menuService.deleteMenu).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
