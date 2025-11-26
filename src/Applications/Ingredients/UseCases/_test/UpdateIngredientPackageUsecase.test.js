import { jest } from "@jest/globals";
import UpdateIngredientPackageUsecase from "../UpdateIngredientPackageUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateIngredientPackageUsecase", () => {
	let ingredientPackageService;
	let ingredientService;
	let packageService;
	let usecase;
	let existing;

	beforeEach(() => {
		ingredientPackageService = { getIngredientPackage: jest.fn(), updateIngredientPackage: jest.fn() };
		ingredientService = { getIngredient: jest.fn().mockResolvedValue({ id: 1 }) };
		packageService = { getPackage: jest.fn().mockResolvedValue({ id: 2 }) };
		existing = { id: 5, ingredientId: 1, packageId: 2, qty: 1 };
		ingredientPackageService.getIngredientPackage.mockResolvedValue(existing);
		usecase = new UpdateIngredientPackageUsecase({
			ingredientPackageService,
			ingredientService,
			packageService
		});
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateIngredientPackageUsecase()).toThrow("INGREDIENT_PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when record not found", async () => {
		ingredientPackageService.getIngredientPackage.mockResolvedValue(null);

		await expect(usecase.execute(5, { qty: 2 })).rejects.toThrow(
			new ValidationError("Ingredient package not found")
		);
	});

	test("should throw when no updatable fields", async () => {
		await expect(usecase.execute(5, {})).rejects.toThrow(new ValidationError("No updatable fields provided"));
	});

	test("should update ingredient package with validated ids", async () => {
		const updated = { id: 5, qty: 2 };
		ingredientPackageService.updateIngredientPackage.mockResolvedValue(updated);

		const result = await usecase.execute("5", { ingredientId: "1", packageId: "2", qty: "2" });

		expect(ingredientPackageService.updateIngredientPackage).toHaveBeenCalledWith({
			id: 5,
			data: { ingredientId: 1, packageId: 2, qty: 2 }
		});
		expect(result).toEqual(updated);
	});
});
