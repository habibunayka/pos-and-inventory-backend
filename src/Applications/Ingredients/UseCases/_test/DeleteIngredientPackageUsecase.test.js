import { jest } from "@jest/globals";
import DeleteIngredientPackageUsecase from "../DeleteIngredientPackageUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteIngredientPackageUsecase", () => {
	let ingredientPackageService;
	let usecase;

	beforeEach(() => {
		ingredientPackageService = { deleteIngredientPackage: jest.fn() };
		usecase = new DeleteIngredientPackageUsecase({ ingredientPackageService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteIngredientPackageUsecase()).toThrow("INGREDIENT_PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should delete ingredient package", async () => {
		ingredientPackageService.deleteIngredientPackage.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(ingredientPackageService.deleteIngredientPackage).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
