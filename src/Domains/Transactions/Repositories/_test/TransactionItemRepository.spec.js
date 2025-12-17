import { describe, expect, it } from "@jest/globals";
import TransactionItemRepository from "../TransactionItemRepository.js";

describe("TransactionItemRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new TransactionItemRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter(
			(name) => name !== "constructor"
		);

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("TRANSACTION_ITEM_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
