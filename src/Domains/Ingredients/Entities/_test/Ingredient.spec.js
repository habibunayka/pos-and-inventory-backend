import { describe, expect, it } from "@jest/globals";
import Ingredient from "../Ingredient.js";

describe("Ingredient", () => {
	it("returns null when record is missing", () => {
		expect(Ingredient.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			name: "name-value-2",
			unitId: "unitId-value-3"
		};

		const entity = Ingredient.fromPersistence(record);

		expect(entity).toBeInstanceOf(Ingredient);
		expect(entity).toMatchObject({
			id: "id-value-1",
			name: "name-value-2",
			unitId: "unitId-value-3"
		});
	});

});
