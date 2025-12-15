import { jest } from "@jest/globals";
import CreateCategoryUsecase from "../CreateCategoryUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateCategoryUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			getCategoryByName: jest.fn(),
			createCategory: jest.fn()
		};

		usecase = new CreateCategoryUsecase({ categoryService: mockService });
	});

	test("should throw when service is missing", () => {
		expect(() => new CreateCategoryUsecase()).toThrow("CATEGORY_USECASE.MISSING_SERVICE");
	});

	test("should throw validation error when name is empty", async () => {
		await expect(usecase.execute({ name: "   " })).rejects.toThrow(
			new ValidationError("Category name is required")
		);
	});

	test("should throw when payload is missing", async () => {
		await expect(usecase.execute()).rejects.toThrow(new ValidationError("Category name is required"));
	});

	test("should throw error if category already exists", async () => {
		mockService.getCategoryByName.mockResolvedValue({ id: "20", name: "food" });

		await expect(usecase.execute({ name: "Food" })).rejects.toThrow(
			new ValidationError("Category food already exists")
		);
	});

	test("should create category when name available", async () => {
		mockService.getCategoryByName.mockResolvedValue(null);
		mockService.createCategory.mockResolvedValue({ id: "10", name: "food" });

		const result = await usecase.execute({ name: "  FOOD  " });

		expect(mockService.getCategoryByName).toHaveBeenCalledWith("food");
		expect(mockService.createCategory).toHaveBeenCalledWith({ name: "food" });
		expect(result).toEqual({ id: "10", name: "food" });
	});

	test("should normalize the name before creation", async () => {
		mockService.getCategoryByName.mockResolvedValue(null);
		mockService.createCategory.mockResolvedValue({ id: "99", name: "beverage" });

		await usecase.execute({ name: "  BeVerAge  " });

		expect(mockService.createCategory).toHaveBeenCalledWith({ name: "beverage" });
	});
});
