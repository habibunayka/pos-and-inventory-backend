import { jest } from "@jest/globals";
import GetIngredientPackageUsecase from "../GetIngredientPackageUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetIngredientPackageUsecase", () => {
	let ingredientPackageService;
	let usecase;

	beforeEach(() => {
		ingredientPackageService = { getIngredientPackage: jest.fn() };
		usecase = new GetIngredientPackageUsecase({ ingredientPackageService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetIngredientPackageUsecase()).toThrow("INGREDIENT_PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when record not found", async () => {
		ingredientPackageService.getIngredientPackage.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Ingredient package not found"));
	});

	test("should return record when found", async () => {
		ingredientPackageService.getIngredientPackage.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(ingredientPackageService.getIngredientPackage).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
