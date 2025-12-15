import { jest } from "@jest/globals";
import GetMenuUsecase from "../GetMenuUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetMenuUsecase", () => {
	let menuService;
	let usecase;

	beforeEach(() => {
		menuService = { getMenu: jest.fn() };
		usecase = new GetMenuUsecase({ menuService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetMenuUsecase()).toThrow("MENU_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when record not found", async () => {
		menuService.getMenu.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Menu not found"));
	});

	test("should return menu when found", async () => {
		const rec = { id: 2 };
		menuService.getMenu.mockResolvedValue(rec);

		const result = await usecase.execute("2");

		expect(menuService.getMenu).toHaveBeenCalledWith(2);
		expect(result).toEqual(rec);
	});
});
