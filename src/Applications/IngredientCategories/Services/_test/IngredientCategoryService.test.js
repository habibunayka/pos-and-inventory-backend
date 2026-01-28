import { jest } from "@jest/globals";
import IngredientCategoryService from "../IngredientCategoryService.js";

describe("IngredientCategoryService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			findByName: jest.fn(),
			createIngredientCategory: jest.fn(),
			updateIngredientCategory: jest.fn(),
			deleteIngredientCategory: jest.fn()
		};
	});

	test("should throw when repository is not provided", () => {
		expect(() => new IngredientCategoryService()).toThrow("INGREDIENT_CATEGORY_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository is missing required methods", () => {
		const badRepo = { findAll: () => {} };

		expect(() => new IngredientCategoryService({ ingredientCategoryRepository: badRepo })).toThrow(
			"INGREDIENT_CATEGORY_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("should assign repository when valid", () => {
		const service = new IngredientCategoryService({ ingredientCategoryRepository: mockRepo });
		expect(service._repo).toBe(mockRepo);
	});

	test("listIngredientCategories() should call repo.findAll()", () => {
		mockRepo.findAll.mockResolvedValue(["a", "b"]);

		const service = new IngredientCategoryService({ ingredientCategoryRepository: mockRepo });
		const result = service.listIngredientCategories();

		expect(mockRepo.findAll).toHaveBeenCalled();
		expect(result).resolves.toEqual(["a", "b"]);
	});

	test("getIngredientCategory() should call repo.findById()", () => {
		mockRepo.findById.mockResolvedValue({ id: "10" });

		const service = new IngredientCategoryService({ ingredientCategoryRepository: mockRepo });
		const result = service.getIngredientCategory("10");

		expect(mockRepo.findById).toHaveBeenCalledWith("10");
		expect(result).resolves.toEqual({ id: "10" });
	});

	test("getIngredientCategoryByName() should call repo.findByName()", () => {
		mockRepo.findByName.mockResolvedValue({ id: "1", name: "Dry" });

		const service = new IngredientCategoryService({ ingredientCategoryRepository: mockRepo });
		const result = service.getIngredientCategoryByName("Dry");

		expect(mockRepo.findByName).toHaveBeenCalledWith("Dry");
		expect(result).resolves.toEqual({ id: "1", name: "Dry" });
	});

	test("createIngredientCategory() should call repo.createIngredientCategory()", () => {
		const data = { name: "Spices" };
		mockRepo.createIngredientCategory.mockResolvedValue({ id: "100", ...data });

		const service = new IngredientCategoryService({ ingredientCategoryRepository: mockRepo });
		const result = service.createIngredientCategory(data);

		expect(mockRepo.createIngredientCategory).toHaveBeenCalledWith(data);
		expect(result).resolves.toEqual({ id: "100", name: "Spices" });
	});

	test("updateIngredientCategory() should call repo.updateIngredientCategory()", () => {
		const payload = { id: "1", name: "Updated" };
		mockRepo.updateIngredientCategory.mockResolvedValue(payload);

		const service = new IngredientCategoryService({ ingredientCategoryRepository: mockRepo });
		const result = service.updateIngredientCategory(payload);

		expect(mockRepo.updateIngredientCategory).toHaveBeenCalledWith(payload);
		expect(result).resolves.toEqual(payload);
	});

	test("deleteIngredientCategory() should call repo.deleteIngredientCategory()", () => {
		mockRepo.deleteIngredientCategory.mockResolvedValue(true);

		const service = new IngredientCategoryService({ ingredientCategoryRepository: mockRepo });
		const result = service.deleteIngredientCategory("1");

		expect(mockRepo.deleteIngredientCategory).toHaveBeenCalledWith("1");
		expect(result).resolves.toBe(true);
	});
});
