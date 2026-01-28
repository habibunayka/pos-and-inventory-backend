import { describe, expect, it } from "@jest/globals";
import IngredientCategoryService from "../IngredientCategoryService.js";
import IngredientCategoryRepository from "../../../../Domains/IngredientCategories/Repositories/IngredientCategoryRepository.js";

describe("IngredientCategoryService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new IngredientCategoryRepository();
		const service = new IngredientCategoryService({ ingredientCategoryRepository: repo });
		expect(service).toBeInstanceOf(IngredientCategoryService);
	});
});
