import { jest } from "@jest/globals";
import BaseIngredientPackageUsecase from "../BaseIngredientPackageUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseIngredientPackageUsecase {}

describe("BaseIngredientPackageUsecase", () => {
	let ingredientPackageService;
	let ingredientService;
	let packageService;

	beforeEach(() => {
		ingredientPackageService = {};
		ingredientService = { getIngredient: jest.fn() };
		packageService = { getPackage: jest.fn() };
	});

	test("should throw when ingredientPackageService missing", () => {
		expect(() => new BaseIngredientPackageUsecase()).toThrow("INGREDIENT_PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("_validateIngredientId should return id when valid", async () => {
		ingredientService.getIngredient.mockResolvedValue({ id: 1 });
		const usecase = new DummyUsecase({ ingredientPackageService, ingredientService });

		await expect(usecase._validateIngredientId("1")).resolves.toBe(1);
	});

	test("_validateIngredientId should throw when invalid or not found", async () => {
		const usecase = new DummyUsecase({ ingredientPackageService, ingredientService });
		await expect(usecase._validateIngredientId("abc")).rejects.toThrow(
			new ValidationError("ingredientId must be a positive integer")
		);

		ingredientService.getIngredient.mockResolvedValue(null);
		await expect(usecase._validateIngredientId(2)).rejects.toThrow(
			new ValidationError("ingredientId not found")
		);
	});

	test("_validateIngredientId should skip validation when service missing", async () => {
		const usecase = new DummyUsecase({ ingredientPackageService });

		await expect(usecase._validateIngredientId(3)).resolves.toBe(3);
	});

	test("_validatePackageId should return id when valid", async () => {
		packageService.getPackage.mockResolvedValue({ id: 4 });
		const usecase = new DummyUsecase({ ingredientPackageService, packageService });

		await expect(usecase._validatePackageId("4")).resolves.toBe(4);
	});

	test("_validatePackageId should throw when invalid or not found", async () => {
		const usecase = new DummyUsecase({ ingredientPackageService, packageService });
		await expect(usecase._validatePackageId("abc")).rejects.toThrow(
			new ValidationError("packageId must be a positive integer")
		);

		packageService.getPackage.mockResolvedValue(null);
		await expect(usecase._validatePackageId(5)).rejects.toThrow(new ValidationError("packageId not found"));
	});

	test("_validatePackageId should skip validation when service missing", async () => {
		const usecase = new DummyUsecase({ ingredientPackageService });

		await expect(usecase._validatePackageId(6)).resolves.toBe(6);
	});
});
