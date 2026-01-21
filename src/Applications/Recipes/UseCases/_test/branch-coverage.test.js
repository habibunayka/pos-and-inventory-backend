import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateRecipeUsecase from "../CreateRecipeUsecase.js";
import UpdateRecipeUsecase from "../UpdateRecipeUsecase.js";

describe("Recipes usecase branch coverage", () => {
	it("CreateRecipeUsecase default arg branch", async () => {
		const usecase = new CreateRecipeUsecase({ recipeService: { createRecipe: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("UpdateRecipeUsecase default arg branch", async () => {
		const recipeService = { getRecipe: jest.fn().mockResolvedValue({ id: 1 }), updateRecipe: jest.fn() };
		const usecase = new UpdateRecipeUsecase({ recipeService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);
	});
});
