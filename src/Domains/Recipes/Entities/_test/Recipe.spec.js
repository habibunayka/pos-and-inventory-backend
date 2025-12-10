import { describe, expect, it } from "@jest/globals";
import Recipe from "../Recipe.js";

describe("Recipe", () => {
	it("returns null when record is missing", () => {
		expect(Recipe.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			menuId: "menuId-value-2",
			ingredientId: "ingredientId-value-3",
			qty: "qty-value-4"
		};

		const entity = Recipe.fromPersistence(record);

		expect(entity).toBeInstanceOf(Recipe);
		expect(entity).toMatchObject({
			id: "id-value-1",
			menuId: "menuId-value-2",
			ingredientId: "ingredientId-value-3",
			qty: "qty-value-4"
		});
	});

});
