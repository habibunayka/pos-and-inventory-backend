import { describe, expect, it } from "@jest/globals";
import InventoryStockDaily from "../InventoryStockDaily.js";

describe("InventoryStockDaily", () => {
	it("returns null when record is missing", () => {
		expect(InventoryStockDaily.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			placeId: "placeId-value-2",
			ingredientId: "ingredientId-value-3",
			date: "date-value-4",
			openingQty: "openingQty-value-5",
			closingQty: "closingQty-value-6",
			diffQty: "diffQty-value-7",
			createdAt: "createdAt-value-8"
		};

		const entity = InventoryStockDaily.fromPersistence(record);

		expect(entity).toBeInstanceOf(InventoryStockDaily);
		expect(entity).toMatchObject({
			id: "id-value-1",
			placeId: "placeId-value-2",
			ingredientId: "ingredientId-value-3",
			date: "date-value-4",
			openingQty: "openingQty-value-5",
			closingQty: "closingQty-value-6",
			diffQty: "diffQty-value-7",
			createdAt: "createdAt-value-8"
		});
	});

});
