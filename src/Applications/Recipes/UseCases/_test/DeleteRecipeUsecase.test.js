import { jest } from "@jest/globals";
import DeleteRecipeUsecase from "../DeleteRecipeUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteRecipeUsecase", () => {
	let recipeService;
	let usecase;

	beforeEach(() => {
		recipeService = { deleteRecipe: jest.fn() };
		usecase = new DeleteRecipeUsecase({ recipeService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteRecipeUsecase()).toThrow("RECIPE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should delete recipe", async () => {
		recipeService.deleteRecipe.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(recipeService.deleteRecipe).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
