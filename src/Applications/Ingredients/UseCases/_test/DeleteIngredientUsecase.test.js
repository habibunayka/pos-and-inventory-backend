import { jest } from "@jest/globals";
import DeleteIngredientUsecase from "../DeleteIngredientUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteIngredientUsecase", () => {
	let ingredientService;
	let usecase;

	beforeEach(() => {
		ingredientService = { deleteIngredient: jest.fn() };
		usecase = new DeleteIngredientUsecase({ ingredientService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteIngredientUsecase()).toThrow("INGREDIENT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should delete ingredient", async () => {
		ingredientService.deleteIngredient.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(ingredientService.deleteIngredient).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
