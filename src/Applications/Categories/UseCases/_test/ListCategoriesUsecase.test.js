import { jest } from "@jest/globals";
import ListCategoriesUsecase from "../ListCategoriesUsecase.js";
import BaseCategoryUsecase from "../BaseCategoryUsecase.js";

describe("ListCategoriesUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			listCategories: jest.fn()
		};

		usecase = new ListCategoriesUsecase({ categoryService: mockService });
	});

	test("should extend BaseCategoryUsecase", () => {
		expect(usecase).toBeInstanceOf(BaseCategoryUsecase);
	});

	test("execute() should call categoryService.listCategories()", async () => {
		const fakeResult = [
			{ id: 1, name: "food" },
			{ id: 2, name: "drink" }
		];

		mockService.listCategories.mockResolvedValue(fakeResult);

		const result = await usecase.execute();

		expect(mockService.listCategories).toHaveBeenCalledTimes(1);
		expect(result).toEqual(fakeResult);
	});
});
