import { jest } from "@jest/globals";
import ListRecipesUsecase from "../ListRecipesUsecase.js";

describe("ListRecipesUsecase", () => {
	let recipeService;
	let usecase;

	beforeEach(() => {
		recipeService = { listRecipes: jest.fn() };
		usecase = new ListRecipesUsecase({ recipeService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListRecipesUsecase()).toThrow("RECIPE_USECASE.MISSING_SERVICE");
	});

	test("should list recipes", async () => {
		const records = [{ id: 1 }];
		recipeService.listRecipes.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(recipeService.listRecipes).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
