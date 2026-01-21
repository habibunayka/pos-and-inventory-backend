import { describe, expect, it } from "@jest/globals";
import InventoryStockDaily from "../InventoryStockDaily.js";
import PlaceStock from "../PlaceStock.js";
import StockTransfer from "../StockTransfer.js";
import Waste from "../Waste.js";

describe("Stocks entity branch coverage", () => {
	it.each([InventoryStockDaily, PlaceStock, StockTransfer, Waste])(
		"returns null when persistence record is missing for %p",
		(Entity) => {
			expect(Entity.fromPersistence(null)).toBeNull();
		}
	);

	it("InventoryStockDaily defaults nullables", () => {
		const entity = InventoryStockDaily.fromPersistence({ placeId: 1, ingredientId: 2, date: "2024" });
		expect(entity).toMatchObject({ id: null, diffQty: null });
	});

	it("StockTransfer normalizes nullable fields", () => {
		const entity = StockTransfer.fromPersistence({
			fromPlaceId: 1,
			ingredientId: 3,
			qty: 4
		});
		expect(entity).toMatchObject({ id: null, fromPlaceId: 1, toPlaceId: null });
	});

	it("StockTransfer defaults missing fromPlaceId", () => {
		const entity = StockTransfer.fromPersistence({ ingredientId: 3, qty: 4 });
		expect(entity).toMatchObject({ fromPlaceId: null });
	});

	it("Waste defaults nullable fields", () => {
		const entity = Waste.fromPersistence({ ingredientId: 1, qty: 2 });
		expect(entity).toMatchObject({ id: null, placeId: null, reason: null });
	});

	it("PlaceStock applies null defaults", () => {
		const entity = PlaceStock.fromPersistence({ placeId: 1, ingredientId: 2, qty: 3 });
		expect(entity).toMatchObject({ id: null, unitId: undefined });
	});

	describe("constructor default branches", () => {
		const cases = [
			{
				Entity: InventoryStockDaily,
				props: { placeId: 1, ingredientId: 2, date: "2024", openingQty: 0, closingQty: 0, createdAt: "now" },
				expected: { diffQty: null }
			},
			{ Entity: PlaceStock, props: { placeId: 1, ingredientId: 2, qty: 3, unitId: 4 }, expected: { id: null } },
			{
				Entity: StockTransfer,
				props: { ingredientId: 1, qty: 5, createdAt: "now" },
				expected: { fromPlaceId: null, toPlaceId: null }
			},
			{
				Entity: Waste,
				props: { ingredientId: 1, qty: 1, createdAt: "now" },
				expected: { placeId: null, reason: null }
			}
		];

		it.each(cases)("applies defaults for %p", ({ Entity, props, expected }) => {
			const entity = new Entity(props);
			expect(entity).toBeInstanceOf(Entity);
			expect(entity).toMatchObject(expected);
		});
	});
});
