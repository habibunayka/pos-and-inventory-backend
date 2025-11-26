import * as usecases from "../index.js";
import ListIngredientsUsecase from "../ListIngredientsUsecase.js";
import GetIngredientUsecase from "../GetIngredientUsecase.js";
import CreateIngredientUsecase from "../CreateIngredientUsecase.js";
import UpdateIngredientUsecase from "../UpdateIngredientUsecase.js";
import DeleteIngredientUsecase from "../DeleteIngredientUsecase.js";
import { default as ingredientPackagesIndex } from "../ingredientPackagesIndex.js";
import * as packagesExports from "../ingredientPackagesIndex.js";

describe("Ingredients Usecases index exports", () => {
	test("should export ingredient usecases", () => {
		expect(usecases.ListIngredientsUsecase).toBe(ListIngredientsUsecase);
		expect(usecases.GetIngredientUsecase).toBe(GetIngredientUsecase);
		expect(usecases.CreateIngredientUsecase).toBe(CreateIngredientUsecase);
		expect(usecases.UpdateIngredientUsecase).toBe(UpdateIngredientUsecase);
		expect(usecases.DeleteIngredientUsecase).toBe(DeleteIngredientUsecase);
	});
});

describe("IngredientPackages index exports", () => {
	test("should export ingredient package usecases", () => {
		expect(packagesExports.ListIngredientPackagesUsecase).toBe(ingredientPackagesIndex.ListIngredientPackagesUsecase);
		expect(packagesExports.GetIngredientPackageUsecase).toBe(ingredientPackagesIndex.GetIngredientPackageUsecase);
		expect(packagesExports.CreateIngredientPackageUsecase).toBe(ingredientPackagesIndex.CreateIngredientPackageUsecase);
		expect(packagesExports.UpdateIngredientPackageUsecase).toBe(ingredientPackagesIndex.UpdateIngredientPackageUsecase);
		expect(packagesExports.DeleteIngredientPackageUsecase).toBe(ingredientPackagesIndex.DeleteIngredientPackageUsecase);
	});
});
