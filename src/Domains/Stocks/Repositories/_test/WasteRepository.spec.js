import { describe, expect, it } from "@jest/globals";
import WasteRepository from "../WasteRepository.js";

describe("WasteRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new WasteRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter(
			(name) => name !== "constructor"
		);

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("WASTE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
