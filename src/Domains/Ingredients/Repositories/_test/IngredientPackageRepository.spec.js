import { describe, expect, it } from "@jest/globals";
import IngredientPackageRepository from "../IngredientPackageRepository.js";

describe("IngredientPackageRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new IngredientPackageRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter(
			(name) => name !== "constructor"
		);

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow(
				"INGREDIENT_PACKAGE_REPOSITORY.METHOD_NOT_IMPLEMENTED"
			);
		}
	});
});
