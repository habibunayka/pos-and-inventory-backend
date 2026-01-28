import { describe, expect, it } from "@jest/globals";
import Ingredient from "../Ingredient.js";
import IngredientPackage from "../IngredientPackage.js";

describe("Ingredient entity branch coverage", () => {
	it.each([Ingredient, IngredientPackage])("returns null when persistence record is missing for %p", (Entity) => {
		expect(Entity.fromPersistence(null)).toBeNull();
	});

	it("Ingredient defaults optional fields", () => {
		const entity = Ingredient.fromPersistence({ name: "Salt", unitId: 1 });
		expect(entity).toMatchObject({ id: null, unitId: 1, categoryId: null, sku: null });
	});

	it("IngredientPackage uses defaults", () => {
		const entity = IngredientPackage.fromPersistence({ ingredientId: 1, unitId: 2 });
		expect(entity).toMatchObject({ id: null, qty: undefined });
	});

	describe("constructor default branches", () => {
		const cases = [
			{
				Entity: Ingredient,
				props: { name: "Salt", unitId: 1 },
				expected: { id: null, categoryId: null, sku: null }
			},
			{
				Entity: IngredientPackage,
				props: { ingredientId: 1, packageId: 2, qty: 3 },
				expected: { id: null }
			}
		];

		it.each(cases)("applies defaults for %p", ({ Entity, props, expected }) => {
			const entity = new Entity(props);
			expect(entity).toBeInstanceOf(Entity);
			expect(entity).toMatchObject(expected);
		});
	});
});
