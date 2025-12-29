import { describe, expect, it } from "@jest/globals";
import KitchenOrderRepository from "../KitchenOrderRepository.js";

describe("KitchenOrderRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new KitchenOrderRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter(
			(name) => name !== "constructor"
		);

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("KITCHEN_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
