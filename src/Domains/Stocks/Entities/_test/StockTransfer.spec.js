import { describe, expect, it } from "@jest/globals";
import StockTransfer from "../StockTransfer.js";

describe("StockTransfer", () => {
	it("returns null when record is missing", () => {
		expect(StockTransfer.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			ingredientId: "ingredientId-value-2",
			fromPlaceId: "fromPlaceId-value-3",
			toPlaceId: "toPlaceId-value-4",
			qty: "qty-value-5",
			createdAt: "createdAt-value-6"
		};

		const entity = StockTransfer.fromPersistence(record);

		expect(entity).toBeInstanceOf(StockTransfer);
		expect(entity).toMatchObject({
			id: "id-value-1",
			ingredientId: "ingredientId-value-2",
			fromPlaceId: "fromPlaceId-value-3",
			toPlaceId: "toPlaceId-value-4",
			qty: "qty-value-5",
			createdAt: "createdAt-value-6"
		});
	});
});
