import * as usecases from "../index.js";
import ListRecipesUsecase from "../ListRecipesUsecase.js";
import GetRecipeUsecase from "../GetRecipeUsecase.js";
import CreateRecipeUsecase from "../CreateRecipeUsecase.js";
import UpdateRecipeUsecase from "../UpdateRecipeUsecase.js";
import DeleteRecipeUsecase from "../DeleteRecipeUsecase.js";

describe("Recipes Usecases index exports", () => {
	test("should export ListRecipesUsecase", () => {
		expect(usecases.ListRecipesUsecase).toBe(ListRecipesUsecase);
	});

	test("should export GetRecipeUsecase", () => {
		expect(usecases.GetRecipeUsecase).toBe(GetRecipeUsecase);
	});

	test("should export CreateRecipeUsecase", () => {
		expect(usecases.CreateRecipeUsecase).toBe(CreateRecipeUsecase);
	});

	test("should export UpdateRecipeUsecase", () => {
		expect(usecases.UpdateRecipeUsecase).toBe(UpdateRecipeUsecase);
	});

	test("should export DeleteRecipeUsecase", () => {
		expect(usecases.DeleteRecipeUsecase).toBe(DeleteRecipeUsecase);
	});
});
