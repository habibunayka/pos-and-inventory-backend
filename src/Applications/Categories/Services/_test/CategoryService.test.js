import { jest } from "@jest/globals";
import CategoryService from "../CategoryService.js";

describe("CategoryService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			findByName: jest.fn(),
			createCategory: jest.fn(),
			updateCategory: jest.fn(),
			deleteCategory: jest.fn()
		};
	});

	test("should throw when repository is not provided", () => {
		expect(() => new CategoryService()).toThrow("CATEGORY_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository is missing required methods", () => {
		const badRepo = { findAll: () => {} };

		expect(() => new CategoryService({ categoryRepository: badRepo })).toThrow(
			"CATEGORY_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("should assign repository when valid", () => {
		const service = new CategoryService({ categoryRepository: mockRepo });
		expect(service._repo).toBe(mockRepo);
	});

	test("listCategories() should call repo.findAll()", () => {
		mockRepo.findAll.mockResolvedValue(["a", "b"]);

		const service = new CategoryService({ categoryRepository: mockRepo });
		const result = service.listCategories();

		expect(mockRepo.findAll).toHaveBeenCalled();
		expect(result).resolves.toEqual(["a", "b"]);
	});

	test("getCategory() should call repo.findById()", () => {
		mockRepo.findById.mockResolvedValue({ id: "10" });

		const service = new CategoryService({ categoryRepository: mockRepo });
		const result = service.getCategory("10");

		expect(mockRepo.findById).toHaveBeenCalledWith("10");
		expect(result).resolves.toEqual({ id: "10" });
	});

	test("getCategoryByName() should call repo.findByName()", () => {
		mockRepo.findByName.mockResolvedValue({ id: "1", name: "Food" });

		const service = new CategoryService({ categoryRepository: mockRepo });
		const result = service.getCategoryByName("Food");

		expect(mockRepo.findByName).toHaveBeenCalledWith("Food");
		expect(result).resolves.toEqual({ id: "1", name: "Food" });
	});

	test("createCategory() should call repo.createCategory()", () => {
		const data = { name: "NewCat" };
		mockRepo.createCategory.mockResolvedValue({ id: "100", ...data });

		const service = new CategoryService({ categoryRepository: mockRepo });
		const result = service.createCategory(data);

		expect(mockRepo.createCategory).toHaveBeenCalledWith(data);
		expect(result).resolves.toEqual({ id: "100", name: "NewCat" });
	});

	test("updateCategory() should call repo.updateCategory()", () => {
		const payload = { id: "1", name: "Updated" };
		mockRepo.updateCategory.mockResolvedValue(payload);

		const service = new CategoryService({ categoryRepository: mockRepo });
		const result = service.updateCategory(payload);

		expect(mockRepo.updateCategory).toHaveBeenCalledWith(payload);
		expect(result).resolves.toEqual(payload);
	});

	test("deleteCategory() should call repo.deleteCategory()", () => {
		mockRepo.deleteCategory.mockResolvedValue(true);

		const service = new CategoryService({ categoryRepository: mockRepo });
		const result = service.deleteCategory("1");

		expect(mockRepo.deleteCategory).toHaveBeenCalledWith("1");
		expect(result).resolves.toBe(true);
	});
});
