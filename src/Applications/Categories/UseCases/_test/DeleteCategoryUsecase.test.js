import { jest } from "@jest/globals";
import DeleteCategoryUsecase from "../DeleteCategoryUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteCategoryUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			deleteCategory: jest.fn()
		};

		usecase = new DeleteCategoryUsecase({ categoryService: mockService });
	});

	test("should throw when id is not a positive integer", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));

		await expect(usecase.execute(0)).rejects.toThrow(new ValidationError("id must be a positive integer"));

		await expect(usecase.execute(-5)).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should call service.deleteCategory with converted int id", async () => {
		mockService.deleteCategory.mockResolvedValue(true);

		await usecase.execute("15");

		expect(mockService.deleteCategory).toHaveBeenCalledWith(15);
	});

	test("should throw ValidationError if deleteCategory returns false", async () => {
		mockService.deleteCategory.mockResolvedValue(false);

		await expect(usecase.execute(10)).rejects.toThrow(new ValidationError("Category not found"));
	});

	test("should return true when deletion succeeds", async () => {
		mockService.deleteCategory.mockResolvedValue(true);

		const result = await usecase.execute(7);

		expect(result).toBe(true);
	});
});
