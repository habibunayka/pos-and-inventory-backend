import { jest } from "@jest/globals";
import UpdateIngredientUsecase from "../UpdateIngredientUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateIngredientUsecase", () => {
	let ingredientService;
	let unitService;
	let usecase;

	beforeEach(() => {
		ingredientService = { getIngredient: jest.fn(), updateIngredient: jest.fn() };
		unitService = { getUnit: jest.fn().mockResolvedValue({ id: 2 }) };
		ingredientService.getIngredient.mockResolvedValue({ id: 1, name: "Sugar", unitId: 1 });
		usecase = new UpdateIngredientUsecase({ ingredientService, unitService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateIngredientUsecase()).toThrow("INGREDIENT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when record not found", async () => {
		ingredientService.getIngredient.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "New" })).rejects.toThrow(new ValidationError("Ingredient not found"));
	});

	test("should throw when name empty", async () => {
		await expect(usecase.execute(1, { name: "   " })).rejects.toThrow(new ValidationError("name cannot be empty"));
	});

	test("should throw when no updatable fields", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No updatable fields provided"));
	});

	test("should update ingredient with normalized payload", async () => {
		const updated = { id: 1, name: "New", unitId: 2 };
		ingredientService.updateIngredient.mockResolvedValue(updated);

		const result = await usecase.execute("1", { name: " New ", unitId: "2" });

		expect(ingredientService.updateIngredient).toHaveBeenCalledWith({
			id: 1,
			ingredientData: { name: "New", unitId: 2 }
		});
		expect(result).toEqual(updated);
	});
});
