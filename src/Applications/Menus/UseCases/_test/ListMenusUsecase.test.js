import { jest } from "@jest/globals";
import ListMenusUsecase from "../ListMenusUsecase.js";

describe("ListMenusUsecase", () => {
	let menuService;
	let usecase;

	beforeEach(() => {
		menuService = { listMenus: jest.fn() };
		usecase = new ListMenusUsecase({ menuService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListMenusUsecase()).toThrow("MENU_USECASE.MISSING_SERVICE");
	});

	test("should list menus", async () => {
		const records = [{ id: 1 }];
		menuService.listMenus.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(menuService.listMenus).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
