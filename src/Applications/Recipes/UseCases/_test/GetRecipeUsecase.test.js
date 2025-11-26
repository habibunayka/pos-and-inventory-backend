import { jest } from "@jest/globals";
import GetRecipeUsecase from "../GetRecipeUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetRecipeUsecase", () => {
	let recipeService;
	let usecase;

	beforeEach(() => {
		recipeService = { getRecipe: jest.fn() };
		usecase = new GetRecipeUsecase({ recipeService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetRecipeUsecase()).toThrow("RECIPE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when recipe not found", async () => {
		recipeService.getRecipe.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Recipe not found"));
	});

	test("should return recipe when found", async () => {
		recipeService.getRecipe.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(recipeService.getRecipe).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
