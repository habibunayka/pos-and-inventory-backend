import { jest } from "@jest/globals";
import CreateRecipeUsecase from "../CreateRecipeUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateRecipeUsecase", () => {
	let recipeService;
	let usecase;

	beforeEach(() => {
		recipeService = { createRecipe: jest.fn() };
		usecase = new CreateRecipeUsecase({ recipeService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateRecipeUsecase()).toThrow("RECIPE_USECASE.MISSING_SERVICE");
	});

	test("should throw when qty invalid", async () => {
		await expect(usecase.execute({ menuId: 1, ingredientId: 2, qty: "abc" })).rejects.toThrow(
			new ValidationError("qty must be a positive number")
		);
	});

test("should create recipe with normalized data", async () => {
const created = { id: 1 };
recipeService.createRecipe.mockResolvedValue(created);

const result = await usecase.execute({ menuId: "2", ingredientId: "3", qty: "5" });

expect(recipeService.createRecipe).toHaveBeenCalledWith({ menuId: 2, ingredientId: 3, qty: 5 });
expect(result).toEqual(created);
});
});
