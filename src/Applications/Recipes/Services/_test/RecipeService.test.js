import { jest } from "@jest/globals";
import RecipeService from "../RecipeService.js";

describe("RecipeService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createRecipe: jest.fn(),
			updateRecipe: jest.fn(),
			deleteRecipe: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new RecipeService()).toThrow("RECIPE_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new RecipeService({ recipeRepository: badRepo })).toThrow(
			"RECIPE_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listRecipes should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new RecipeService({ recipeRepository: mockRepo });

		const result = service.listRecipes();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getRecipe should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new RecipeService({ recipeRepository: mockRepo });

		const result = service.getRecipe(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createRecipe should delegate to repository", async () => {
		mockRepo.createRecipe.mockResolvedValue({ id: 3 });
		const service = new RecipeService({ recipeRepository: mockRepo });

		const result = service.createRecipe({ name: "Recipe" });

		expect(mockRepo.createRecipe).toHaveBeenCalledWith({ name: "Recipe" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateRecipe should delegate to repository", async () => {
		mockRepo.updateRecipe.mockResolvedValue({ id: 4 });
		const service = new RecipeService({ recipeRepository: mockRepo });

		const result = service.updateRecipe({ id: 4, data: { name: "New" } });

		expect(mockRepo.updateRecipe).toHaveBeenCalledWith({ id: 4, data: { name: "New" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteRecipe should delegate to repository", async () => {
		mockRepo.deleteRecipe.mockResolvedValue(true);
		const service = new RecipeService({ recipeRepository: mockRepo });

		const result = service.deleteRecipe(5);

		expect(mockRepo.deleteRecipe).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
