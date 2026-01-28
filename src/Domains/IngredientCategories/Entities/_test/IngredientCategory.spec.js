import { describe, expect, it } from "@jest/globals";
import IngredientCategory from "../IngredientCategory.js";

describe("IngredientCategory", () => {
	it("returns null when record is missing", () => {
		expect(IngredientCategory.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			name: "name-value-2"
		};

		const entity = IngredientCategory.fromPersistence(record);

		expect(entity).toBeInstanceOf(IngredientCategory);
		expect(entity).toMatchObject({
			id: "id-value-1",
			name: "name-value-2"
		});
	});
});
