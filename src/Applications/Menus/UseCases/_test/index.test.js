import * as usecases from "../index.js";
import ListMenusUsecase from "../ListMenusUsecase.js";
import GetMenuUsecase from "../GetMenuUsecase.js";
import CreateMenuUsecase from "../CreateMenuUsecase.js";
import UpdateMenuUsecase from "../UpdateMenuUsecase.js";
import DeleteMenuUsecase from "../DeleteMenuUsecase.js";

describe("Menus Usecases index exports", () => {
	test("should export ListMenusUsecase", () => {
		expect(usecases.ListMenusUsecase).toBe(ListMenusUsecase);
	});

	test("should export GetMenuUsecase", () => {
		expect(usecases.GetMenuUsecase).toBe(GetMenuUsecase);
	});

	test("should export CreateMenuUsecase", () => {
		expect(usecases.CreateMenuUsecase).toBe(CreateMenuUsecase);
	});

	test("should export UpdateMenuUsecase", () => {
		expect(usecases.UpdateMenuUsecase).toBe(UpdateMenuUsecase);
	});

	test("should export DeleteMenuUsecase", () => {
		expect(usecases.DeleteMenuUsecase).toBe(DeleteMenuUsecase);
	});
});
