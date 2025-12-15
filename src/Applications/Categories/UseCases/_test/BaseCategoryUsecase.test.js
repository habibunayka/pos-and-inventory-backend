import { jest } from "@jest/globals";
import BaseCategoryUsecase from "../BaseCategoryUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("BaseCategoryUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			getCategoryByName: jest.fn()
		};

		usecase = new BaseCategoryUsecase({ categoryService: mockService });
	});

	test("should throw when categoryService is missing", () => {
		expect(() => new BaseCategoryUsecase()).toThrow("CATEGORY_USECASE.MISSING_SERVICE");
	});

	test("_normalize should trim and lowercase text", () => {
		expect(usecase._normalize("   FOOD   ")).toBe("food");
		expect(usecase._normalize("  beaverage")).toBe("beaverage");
	});

	test("_normalize should handle null/undefined safely", () => {
		expect(usecase._normalize(null)).toBe("");
		expect(usecase._normalize(undefined)).toBe("");
	});

	test("_assertNameAvailable should throw if name empty", async () => {
		await expect(usecase._assertNameAvailable("   ")).rejects.toThrow(
			new ValidationError("Category name is required")
		);
	});

	test("_assertNameAvailable should throw if category already exists", async () => {
		mockService.getCategoryByName.mockResolvedValue({ id: "123", name: "food" });

		await expect(usecase._assertNameAvailable("Food")).rejects.toThrow(
			new ValidationError("Category food already exists")
		);
	});

	test("_assertNameAvailable should pass when existing category is same as ignoreId", async () => {
		mockService.getCategoryByName.mockResolvedValue({ id: "10", name: "food" });

		const result = await usecase._assertNameAvailable("FOOD", "10");

		expect(result).toBe("food");
	});

	test("_assertNameAvailable should return normalized name when available", async () => {
		mockService.getCategoryByName.mockResolvedValue(null);

		const result = await usecase._assertNameAvailable("  BeaVerAge  ");

		expect(result).toBe("beaverage");
	});
});
