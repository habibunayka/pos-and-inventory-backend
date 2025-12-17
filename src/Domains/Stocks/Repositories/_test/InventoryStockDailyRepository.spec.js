import { describe, expect, it } from "@jest/globals";
import InventoryStockDailyRepository from "../InventoryStockDailyRepository.js";

describe("InventoryStockDailyRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new InventoryStockDailyRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter(
			(name) => name !== "constructor"
		);

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow(
				"INVENTORY_STOCK_DAILY_REPOSITORY.METHOD_NOT_IMPLEMENTED"
			);
		}
	});
});
