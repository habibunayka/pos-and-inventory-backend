import { jest } from "@jest/globals";
import ListIngredientPackagesUsecase from "../ListIngredientPackagesUsecase.js";

describe("ListIngredientPackagesUsecase", () => {
	let ingredientPackageService;
	let usecase;

	beforeEach(() => {
		ingredientPackageService = { listIngredientPackages: jest.fn() };
		usecase = new ListIngredientPackagesUsecase({ ingredientPackageService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListIngredientPackagesUsecase()).toThrow("INGREDIENT_PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("should list ingredient packages", async () => {
		const records = [{ id: 1 }];
		ingredientPackageService.listIngredientPackages.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(ingredientPackageService.listIngredientPackages).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
