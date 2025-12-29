import { describe, expect, it } from "@jest/globals";
import ShiftRepository from "../ShiftRepository.js";

describe("ShiftRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new ShiftRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter(
			(name) => name !== "constructor"
		);

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("SHIFT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
