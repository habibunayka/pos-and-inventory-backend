import * as exportsIndex from "../ingredientPackagesIndex.js";
import ListIngredientPackagesUsecase from "../ListIngredientPackagesUsecase.js";
import GetIngredientPackageUsecase from "../GetIngredientPackageUsecase.js";
import CreateIngredientPackageUsecase from "../CreateIngredientPackageUsecase.js";
import UpdateIngredientPackageUsecase from "../UpdateIngredientPackageUsecase.js";
import DeleteIngredientPackageUsecase from "../DeleteIngredientPackageUsecase.js";

describe("ingredientPackagesIndex exports", () => {
	test("should export all ingredient package usecases", () => {
		expect(exportsIndex.ListIngredientPackagesUsecase).toBe(ListIngredientPackagesUsecase);
		expect(exportsIndex.GetIngredientPackageUsecase).toBe(GetIngredientPackageUsecase);
		expect(exportsIndex.CreateIngredientPackageUsecase).toBe(CreateIngredientPackageUsecase);
		expect(exportsIndex.UpdateIngredientPackageUsecase).toBe(UpdateIngredientPackageUsecase);
		expect(exportsIndex.DeleteIngredientPackageUsecase).toBe(DeleteIngredientPackageUsecase);
	});
});
