import { describe, expect, it } from "@jest/globals";
import Recipe from "../Recipe.js";

describe("Recipe entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(Recipe.fromPersistence(null)).toBeNull();
	});

	it("Recipe covers nullable defaults", () => {
		const entity = Recipe.fromPersistence({ menuId: 1, ingredientId: 2, qty: 3 });
		expect(entity).toMatchObject({ id: null, menuId: 1, ingredientId: 2, qty: 3 });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new Recipe({ menuId: 1, ingredientId: 2, qty: 3 });
			expect(entity).toBeInstanceOf(Recipe);
			expect(entity).toMatchObject({ id: null });
		});
	});
});
