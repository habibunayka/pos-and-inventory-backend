import { describe, expect, it } from "@jest/globals";
import SupplierProductRepository from "../SupplierProductRepository.js";

describe("SupplierProductRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new SupplierProductRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter(
			(name) => name !== "constructor"
		);

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("SUPPLIER_PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
