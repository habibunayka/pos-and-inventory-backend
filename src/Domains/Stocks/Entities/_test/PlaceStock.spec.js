import { describe, expect, it } from "@jest/globals";
import PlaceStock from "../PlaceStock.js";

describe("PlaceStock", () => {
	it("returns null when record is missing", () => {
		expect(PlaceStock.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			placeId: "placeId-value-2",
			ingredientId: "ingredientId-value-3",
			qty: "qty-value-4",
			unitId: "unitId-value-5"
		};

		const entity = PlaceStock.fromPersistence(record);

		expect(entity).toBeInstanceOf(PlaceStock);
		expect(entity).toMatchObject({
			id: "id-value-1",
			placeId: "placeId-value-2",
			ingredientId: "ingredientId-value-3",
			qty: "qty-value-4",
			unitId: "unitId-value-5"
		});
	});

});
