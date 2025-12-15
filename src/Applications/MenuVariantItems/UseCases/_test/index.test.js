import * as usecases from "../index.js";
import ListMenuVariantItemsUsecase from "../ListMenuVariantItemsUsecase.js";
import GetMenuVariantItemUsecase from "../GetMenuVariantItemUsecase.js";
import CreateMenuVariantItemUsecase from "../CreateMenuVariantItemUsecase.js";
import UpdateMenuVariantItemUsecase from "../UpdateMenuVariantItemUsecase.js";
import DeleteMenuVariantItemUsecase from "../DeleteMenuVariantItemUsecase.js";

describe("MenuVariantItems Usecases index exports", () => {
	test("should export ListMenuVariantItemsUsecase", () => {
		expect(usecases.ListMenuVariantItemsUsecase).toBe(ListMenuVariantItemsUsecase);
	});

	test("should export GetMenuVariantItemUsecase", () => {
		expect(usecases.GetMenuVariantItemUsecase).toBe(GetMenuVariantItemUsecase);
	});

	test("should export CreateMenuVariantItemUsecase", () => {
		expect(usecases.CreateMenuVariantItemUsecase).toBe(CreateMenuVariantItemUsecase);
	});

	test("should export UpdateMenuVariantItemUsecase", () => {
		expect(usecases.UpdateMenuVariantItemUsecase).toBe(UpdateMenuVariantItemUsecase);
	});

	test("should export DeleteMenuVariantItemUsecase", () => {
		expect(usecases.DeleteMenuVariantItemUsecase).toBe(DeleteMenuVariantItemUsecase);
	});
});
