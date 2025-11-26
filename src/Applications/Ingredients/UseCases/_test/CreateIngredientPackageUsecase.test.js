import { jest } from "@jest/globals";
import CreateIngredientPackageUsecase from "../CreateIngredientPackageUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateIngredientPackageUsecase", () => {
	let ingredientPackageService;
	let ingredientService;
	let packageService;
	let usecase;

	beforeEach(() => {
		ingredientPackageService = { createIngredientPackage: jest.fn() };
		ingredientService = { getIngredient: jest.fn().mockResolvedValue({ id: 1 }) };
		packageService = { getPackage: jest.fn().mockResolvedValue({ id: 2 }) };
		usecase = new CreateIngredientPackageUsecase({
			ingredientPackageService,
			ingredientService,
			packageService
		});
	});

	test("should throw when service missing", () => {
		expect(() => new CreateIngredientPackageUsecase()).toThrow("INGREDIENT_PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should create ingredient package with validated ids", async () => {
		const created = { id: 5 };
		ingredientPackageService.createIngredientPackage.mockResolvedValue(created);

		const result = await usecase.execute({ ingredientId: "1", packageId: "2", qty: "3" });

		expect(ingredientPackageService.createIngredientPackage).toHaveBeenCalledWith({
			ingredientId: 1,
			packageId: 2,
			qty: 3
		});
		expect(result).toEqual(created);
	});
});
