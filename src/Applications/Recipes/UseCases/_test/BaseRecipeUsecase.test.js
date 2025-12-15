import BaseRecipeUsecase from "../BaseRecipeUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseRecipeUsecase {}

describe("BaseRecipeUsecase", () => {
	test("should throw when service missing", () => {
		expect(() => new BaseRecipeUsecase()).toThrow("RECIPE_USECASE.MISSING_SERVICE");
	});

	test("_toInt should convert valid ids", () => {
		const usecase = new DummyUsecase({ recipeService: {} });
		expect(usecase._toInt("5")).toBe(5);
	});

	test("_toInt should throw on invalid ids", () => {
		const usecase = new DummyUsecase({ recipeService: {} });
		expect(() => usecase._toInt("abc")).toThrow(new ValidationError("id must be a positive integer"));
	});
});
