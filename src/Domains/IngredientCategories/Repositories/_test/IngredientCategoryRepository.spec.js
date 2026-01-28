import { describe, expect, it } from "@jest/globals";
import IngredientCategoryRepository from "../IngredientCategoryRepository.js";

describe("IngredientCategoryRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new IngredientCategoryRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter(
			(name) => name !== "constructor"
		);

		for (const method of methods) {
			await expect(repository[method]({})).rejects.toThrow(
				"INGREDIENT_CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED"
			);
		}
	});
});
