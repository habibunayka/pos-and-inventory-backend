import { describe, expect, it } from "@jest/globals";
import IngredientPackageService from "../IngredientPackageService.js";
import IngredientService from "../IngredientService.js";
import IngredientPackageRepository from "../../../../Domains/Ingredients/Repositories/IngredientPackageRepository.js";
import IngredientRepository from "../../../../Domains/Ingredients/Repositories/IngredientRepository.js";

describe("Ingredient services constructor coverage", () => {
	const cases = [
		{ Service: IngredientPackageService, Repo: IngredientPackageRepository, key: "ingredientPackageRepository" },
		{ Service: IngredientService, Repo: IngredientRepository, key: "ingredientRepository" }
	];

	it.each(cases)("accepts repository instance for %p", ({ Service, Repo, key }) => {
		const repo = new Repo();
		const service = new Service({ [key]: repo });
		expect(service).toBeInstanceOf(Service);
	});
});
