import { jest } from "@jest/globals";
import BaseIngredientUsecase from "../BaseIngredientUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseIngredientUsecase {}

describe("BaseIngredientUsecase", () => {
	let ingredientService;
	let unitService;

	beforeEach(() => {
		ingredientService = {};
		unitService = { getUnit: jest.fn() };
	});

	test("should throw when ingredientService missing", () => {
		expect(() => new BaseIngredientUsecase()).toThrow("INGREDIENT_USECASE.MISSING_SERVICE");
	});

	test("_validateUnitId should return id when valid", async () => {
		unitService.getUnit.mockResolvedValue({ id: 1 });
		const usecase = new DummyUsecase({ ingredientService, unitService });

		await expect(usecase._validateUnitId("1")).resolves.toBe(1);
	});

	test("_validateUnitId should throw when invalid integer", async () => {
		const usecase = new DummyUsecase({ ingredientService, unitService });

		await expect(usecase._validateUnitId("abc")).rejects.toThrow(
			new ValidationError("unitId must be a positive integer")
		);
	});

	test("_validateUnitId should throw when unit not found", async () => {
		unitService.getUnit.mockResolvedValue(null);
		const usecase = new DummyUsecase({ ingredientService, unitService });

		await expect(usecase._validateUnitId(5)).rejects.toThrow(new ValidationError("unitId not found"));
	});

	test("_validateUnitId should skip validation when unitService missing", async () => {
		const usecase = new DummyUsecase({ ingredientService });

		await expect(usecase._validateUnitId("2")).resolves.toBe(2);
	});
});
