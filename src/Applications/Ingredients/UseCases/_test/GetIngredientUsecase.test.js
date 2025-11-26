import { jest } from "@jest/globals";
import GetIngredientUsecase from "../GetIngredientUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetIngredientUsecase", () => {
	let ingredientService;
	let usecase;

	beforeEach(() => {
		ingredientService = { getIngredient: jest.fn() };
		usecase = new GetIngredientUsecase({ ingredientService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetIngredientUsecase()).toThrow("INGREDIENT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when ingredient not found", async () => {
		ingredientService.getIngredient.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Ingredient not found"));
	});

	test("should return ingredient when found", async () => {
		const record = { id: 2 };
		ingredientService.getIngredient.mockResolvedValue(record);

		const result = await usecase.execute("2");

		expect(ingredientService.getIngredient).toHaveBeenCalledWith(2);
		expect(result).toEqual(record);
	});
});
