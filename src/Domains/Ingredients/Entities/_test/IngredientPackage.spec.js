import { describe, expect, it } from "@jest/globals";
import IngredientPackage from "../IngredientPackage.js";

describe("IngredientPackage", () => {
	it("returns null when record is missing", () => {
		expect(IngredientPackage.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			ingredientId: "ingredientId-value-2",
			packageId: "packageId-value-3",
			qty: "qty-value-4"
		};

		const entity = IngredientPackage.fromPersistence(record);

		expect(entity).toBeInstanceOf(IngredientPackage);
		expect(entity).toMatchObject({
			id: "id-value-1",
			ingredientId: "ingredientId-value-2",
			packageId: "packageId-value-3",
			qty: "qty-value-4"
		});
	});

});
