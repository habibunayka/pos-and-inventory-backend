import { jest } from "@jest/globals";
import IngredientPackageService from "../IngredientPackageService.js";

describe("IngredientPackageService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createIngredientPackage: jest.fn(),
			updateIngredientPackage: jest.fn(),
			deleteIngredientPackage: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new IngredientPackageService()).toThrow("INGREDIENT_PACKAGE_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new IngredientPackageService({ ingredientPackageRepository: badRepo })).toThrow(
			"INGREDIENT_PACKAGE_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listIngredientPackages should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new IngredientPackageService({ ingredientPackageRepository: mockRepo });

		const result = service.listIngredientPackages();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getIngredientPackage should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new IngredientPackageService({ ingredientPackageRepository: mockRepo });

		const result = service.getIngredientPackage(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createIngredientPackage should delegate to repository", async () => {
		mockRepo.createIngredientPackage.mockResolvedValue({ id: 3 });
		const service = new IngredientPackageService({ ingredientPackageRepository: mockRepo });

		const result = service.createIngredientPackage({ foo: "bar" });

		expect(mockRepo.createIngredientPackage).toHaveBeenCalledWith({ foo: "bar" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateIngredientPackage should delegate to repository", async () => {
		mockRepo.updateIngredientPackage.mockResolvedValue({ id: 4 });
		const service = new IngredientPackageService({ ingredientPackageRepository: mockRepo });

		const result = service.updateIngredientPackage({ id: 4, data: { qty: 2 } });

		expect(mockRepo.updateIngredientPackage).toHaveBeenCalledWith({ id: 4, data: { qty: 2 } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteIngredientPackage should delegate to repository", async () => {
		mockRepo.deleteIngredientPackage.mockResolvedValue(true);
		const service = new IngredientPackageService({ ingredientPackageRepository: mockRepo });

		const result = service.deleteIngredientPackage(5);

		expect(mockRepo.deleteIngredientPackage).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
