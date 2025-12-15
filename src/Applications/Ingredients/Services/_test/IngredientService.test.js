import { jest } from "@jest/globals";
import IngredientService from "../IngredientService.js";

describe("IngredientService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createIngredient: jest.fn(),
			updateIngredient: jest.fn(),
			deleteIngredient: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new IngredientService()).toThrow("INGREDIENT_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new IngredientService({ ingredientRepository: badRepo })).toThrow(
			"INGREDIENT_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listIngredients should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new IngredientService({ ingredientRepository: mockRepo });

		const result = service.listIngredients();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getIngredient should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new IngredientService({ ingredientRepository: mockRepo });

		const result = service.getIngredient(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createIngredient should delegate to repository", async () => {
		mockRepo.createIngredient.mockResolvedValue({ id: 3 });
		const service = new IngredientService({ ingredientRepository: mockRepo });

		const result = service.createIngredient({ name: "Sugar" });

		expect(mockRepo.createIngredient).toHaveBeenCalledWith({ name: "Sugar" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateIngredient should delegate to repository", async () => {
		mockRepo.updateIngredient.mockResolvedValue({ id: 4 });
		const service = new IngredientService({ ingredientRepository: mockRepo });

		const result = service.updateIngredient({ id: 4, ingredientData: { name: "Salt" } });

		expect(mockRepo.updateIngredient).toHaveBeenCalledWith({ id: 4, ingredientData: { name: "Salt" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteIngredient should delegate to repository", async () => {
		mockRepo.deleteIngredient.mockResolvedValue(true);
		const service = new IngredientService({ ingredientRepository: mockRepo });

		const result = service.deleteIngredient(5);

		expect(mockRepo.deleteIngredient).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
