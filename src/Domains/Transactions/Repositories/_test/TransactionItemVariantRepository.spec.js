import { describe, expect, it } from "@jest/globals";
import TransactionItemVariantRepository from "../TransactionItemVariantRepository.js";

describe("TransactionItemVariantRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new TransactionItemVariantRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter((name) => name !== "constructor");

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("TRANSACTION_ITEM_VARIANT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
