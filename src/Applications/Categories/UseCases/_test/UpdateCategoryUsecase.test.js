import { jest } from "@jest/globals";
import UpdateCategoryUsecase from "../UpdateCategoryUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateCategoryUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			updateCategory: jest.fn(),
			getCategoryByName: jest.fn()
		};
		usecase = new UpdateCategoryUsecase({ categoryService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateCategoryUsecase()).toThrow("CATEGORY_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", { name: "Food" })).rejects.toThrow(
			new ValidationError("id must be a positive integer")
		);
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when category not found", async () => {
		mockService.getCategoryByName.mockResolvedValue(null);
		mockService.updateCategory.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "Food" })).rejects.toThrow(
			new ValidationError("Category not found")
		);
	});

	test("should update category with normalized name", async () => {
		mockService.getCategoryByName.mockResolvedValue(null);
		const updated = { id: 1, name: "food" };
		mockService.updateCategory.mockResolvedValue(updated);

		const result = await usecase.execute("1", { name: " Food " });

		expect(mockService.updateCategory).toHaveBeenCalledWith({ id: 1, data: { name: "food" } });
		expect(result).toEqual(updated);
	});
});
