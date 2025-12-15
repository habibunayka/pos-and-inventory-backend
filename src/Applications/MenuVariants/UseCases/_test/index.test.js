import * as usecases from "../index.js";
import ListMenuVariantsUsecase from "../ListMenuVariantsUsecase.js";
import GetMenuVariantUsecase from "../GetMenuVariantUsecase.js";
import CreateMenuVariantUsecase from "../CreateMenuVariantUsecase.js";
import UpdateMenuVariantUsecase from "../UpdateMenuVariantUsecase.js";
import DeleteMenuVariantUsecase from "../DeleteMenuVariantUsecase.js";

describe("MenuVariants Usecases index exports", () => {
	test("should export ListMenuVariantsUsecase", () => {
		expect(usecases.ListMenuVariantsUsecase).toBe(ListMenuVariantsUsecase);
	});

	test("should export GetMenuVariantUsecase", () => {
		expect(usecases.GetMenuVariantUsecase).toBe(GetMenuVariantUsecase);
	});

	test("should export CreateMenuVariantUsecase", () => {
		expect(usecases.CreateMenuVariantUsecase).toBe(CreateMenuVariantUsecase);
	});

	test("should export UpdateMenuVariantUsecase", () => {
		expect(usecases.UpdateMenuVariantUsecase).toBe(UpdateMenuVariantUsecase);
	});

	test("should export DeleteMenuVariantUsecase", () => {
		expect(usecases.DeleteMenuVariantUsecase).toBe(DeleteMenuVariantUsecase);
	});
});
