import * as usecases from "../index.js";
import ListMenuPricesUsecase from "../ListMenuPricesUsecase.js";
import GetMenuPriceUsecase from "../GetMenuPriceUsecase.js";
import CreateMenuPriceUsecase from "../CreateMenuPriceUsecase.js";
import UpdateMenuPriceUsecase from "../UpdateMenuPriceUsecase.js";
import DeleteMenuPriceUsecase from "../DeleteMenuPriceUsecase.js";

describe("MenuPrices Usecases index exports", () => {
	test("should export ListMenuPricesUsecase", () => {
		expect(usecases.ListMenuPricesUsecase).toBe(ListMenuPricesUsecase);
	});

	test("should export GetMenuPriceUsecase", () => {
		expect(usecases.GetMenuPriceUsecase).toBe(GetMenuPriceUsecase);
	});

	test("should export CreateMenuPriceUsecase", () => {
		expect(usecases.CreateMenuPriceUsecase).toBe(CreateMenuPriceUsecase);
	});

	test("should export UpdateMenuPriceUsecase", () => {
		expect(usecases.UpdateMenuPriceUsecase).toBe(UpdateMenuPriceUsecase);
	});

	test("should export DeleteMenuPriceUsecase", () => {
		expect(usecases.DeleteMenuPriceUsecase).toBe(DeleteMenuPriceUsecase);
	});
});
