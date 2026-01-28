import { describe, expect, it } from "@jest/globals";
import IngredientCategory from "../IngredientCategory.js";

describe("IngredientCategory entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(IngredientCategory.fromPersistence(null)).toBeNull();
	});

	it("IngredientCategory uses null defaults", () => {
		const entity = IngredientCategory.fromPersistence({});
		expect(entity).toMatchObject({ id: null, name: null });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new IngredientCategory({ name: "Dry Goods" });
			expect(entity).toBeInstanceOf(IngredientCategory);
			expect(entity).toMatchObject({ id: null });
		});
	});
});
