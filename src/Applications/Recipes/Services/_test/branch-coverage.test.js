import { describe, expect, it } from "@jest/globals";
import RecipeService from "../RecipeService.js";
import RecipeRepository from "../../../../Domains/Recipes/Repositories/RecipeRepository.js";

describe("RecipeService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new RecipeRepository();
		const service = new RecipeService({ recipeRepository: repo });
		expect(service).toBeInstanceOf(RecipeService);
	});
});
