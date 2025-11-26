import * as usecases from "../index.js";
import ListCategoriesUsecase from "../ListCategoriesUsecase.js";
import GetCategoryUsecase from "../GetCategoryUsecase.js";
import CreateCategoryUsecase from "../CreateCategoryUsecase.js";
import UpdateCategoryUsecase from "../UpdateCategoryUsecase.js";
import DeleteCategoryUsecase from "../DeleteCategoryUsecase.js";

describe("Categories Usecases index exports", () => {
	test("should export ListCategoriesUsecase", () => {
		expect(usecases.ListCategoriesUsecase).toBe(ListCategoriesUsecase);
	});

	test("should export GetCategoryUsecase", () => {
		expect(usecases.GetCategoryUsecase).toBe(GetCategoryUsecase);
	});

	test("should export CreateCategoryUsecase", () => {
		expect(usecases.CreateCategoryUsecase).toBe(CreateCategoryUsecase);
	});

	test("should export UpdateCategoryUsecase", () => {
		expect(usecases.UpdateCategoryUsecase).toBe(UpdateCategoryUsecase);
	});

	test("should export DeleteCategoryUsecase", () => {
		expect(usecases.DeleteCategoryUsecase).toBe(DeleteCategoryUsecase);
	});
});
