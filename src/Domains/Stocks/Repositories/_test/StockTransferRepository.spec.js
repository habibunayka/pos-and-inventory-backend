import { describe, expect, it } from "@jest/globals";
import StockTransferRepository from "../StockTransferRepository.js";

describe("StockTransferRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new StockTransferRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter(
			(name) => name !== "constructor"
		);

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("STOCK_TRANSFER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
