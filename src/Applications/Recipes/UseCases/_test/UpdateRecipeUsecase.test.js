import { jest } from "@jest/globals";
import UpdateRecipeUsecase from "../UpdateRecipeUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateRecipeUsecase", () => {
	let recipeService;
	let usecase;

	beforeEach(() => {
		recipeService = { updateRecipe: jest.fn() };
		usecase = new UpdateRecipeUsecase({ recipeService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateRecipeUsecase()).toThrow("RECIPE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when qty invalid", async () => {
		await expect(usecase.execute(1, { qty: "abc" })).rejects.toThrow(
			new ValidationError("qty must be a positive number")
		);
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when record not found", async () => {
		recipeService.updateRecipe.mockResolvedValue(null);

		await expect(usecase.execute(1, { qty: 2 })).rejects.toThrow(new ValidationError("Recipe not found"));
	});

	test("should update recipe with normalized data", async () => {
		const updated = { id: 2, qty: 5 };
		recipeService.updateRecipe.mockResolvedValue(updated);

		const result = await usecase.execute("2", { menuId: "3", ingredientId: "4", qty: "5" });

		expect(recipeService.updateRecipe).toHaveBeenCalledWith({
			id: 2,
			data: { menuId: 3, ingredientId: 4, qty: 5 }
		});
		expect(result).toEqual(updated);
	});
});
