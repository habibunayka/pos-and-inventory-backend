import * as usecases from "../index.js";
import * as placeStocks from "../placeStocks/index.js";
import * as inventory from "../inventoryStockDaily/index.js";
import * as stockTransfers from "../stockTransfers/index.js";
import * as wastes from "../wastes/index.js";

describe("Stocks Usecases index exports", () => {
	test("should export placeStocks usecases", () => {
		expect(usecases.placeStocks).toBe(placeStocks);
	});

	test("should export inventoryStockDaily usecases", () => {
		expect(usecases.inventoryStockDaily).toBe(inventory);
	});

	test("should export stockTransfers usecases", () => {
		expect(usecases.stockTransfers).toBe(stockTransfers);
	});

	test("should export wastes usecases", () => {
		expect(usecases.wastes).toBe(wastes);
	});
});
