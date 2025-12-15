import { jest } from "@jest/globals";
import ListIngredientsUsecase from "../ListIngredientsUsecase.js";

describe("ListIngredientsUsecase", () => {
	let ingredientService;
	let usecase;

	beforeEach(() => {
		ingredientService = { listIngredients: jest.fn() };
		usecase = new ListIngredientsUsecase({ ingredientService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListIngredientsUsecase()).toThrow("INGREDIENT_USECASE.MISSING_SERVICE");
	});

	test("should list ingredients", async () => {
		const records = [{ id: 1 }];
		ingredientService.listIngredients.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(ingredientService.listIngredients).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
