import { describe, expect, it } from "@jest/globals";
import CashierShiftRepository from "../CashierShiftRepository.js";

describe("CashierShiftRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new CashierShiftRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter(
			(name) => name !== "constructor"
		);

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("CASHIER_SHIFT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
