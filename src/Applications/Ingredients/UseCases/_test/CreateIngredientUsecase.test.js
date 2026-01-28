import { jest } from "@jest/globals";
import CreateIngredientUsecase from "../CreateIngredientUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateIngredientUsecase", () => {
	let ingredientService;
	let unitService;
	let usecase;

	beforeEach(() => {
		ingredientService = { createIngredient: jest.fn() };
		unitService = { getUnit: jest.fn() };
		unitService.getUnit.mockResolvedValue({ id: 1 });
		usecase = new CreateIngredientUsecase({ ingredientService, unitService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateIngredientUsecase()).toThrow("INGREDIENT_USECASE.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ unitId: 1, name: "   " })).rejects.toThrow(
			new ValidationError("name is required")
		);
	});

	test("should create ingredient with normalized payload", async () => {
		const created = { id: 5 };
		ingredientService.createIngredient.mockResolvedValue(created);

		const result = await usecase.execute({ name: "  Sugar ", unitId: "1" });

		expect(ingredientService.createIngredient).toHaveBeenCalledWith({ name: "Sugar", unitId: 1 });
		expect(result).toEqual(created);
	});

	test("should include sku when provided", async () => {
		const created = { id: 6 };
		ingredientService.createIngredient.mockResolvedValue(created);

		await usecase.execute({ name: "Salt", unitId: 1, sku: "ING-001" });

		expect(ingredientService.createIngredient).toHaveBeenCalledWith({ name: "Salt", unitId: 1, sku: "ING-001" });
	});
});
