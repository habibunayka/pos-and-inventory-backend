import { jest } from "@jest/globals";
import GetCategoryUsecase from "../GetCategoryUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetCategoryUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			getCategory: jest.fn()
		};

		usecase = new GetCategoryUsecase({ categoryService: mockService });
	});

	test("should throw when id is not a positive integer", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));

		await expect(usecase.execute(0)).rejects.toThrow(new ValidationError("id must be a positive integer"));

		await expect(usecase.execute(-5)).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should call service.getCategory with converted int id", async () => {
		mockService.getCategory.mockResolvedValue({ id: 10, name: "Food" });

		await usecase.execute("10");

		expect(mockService.getCategory).toHaveBeenCalledWith(10);
	});

	test("should throw ValidationError if record not found", async () => {
		mockService.getCategory.mockResolvedValue(null);

		await expect(usecase.execute(5)).rejects.toThrow(new ValidationError("Category not found"));
	});

	test("should return record when found", async () => {
		const record = { id: 2, name: "Beverage" };
		mockService.getCategory.mockResolvedValue(record);

		const result = await usecase.execute(2);

		expect(result).toEqual(record);
	});
});
