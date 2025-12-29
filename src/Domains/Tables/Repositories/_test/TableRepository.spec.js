import { describe, expect, it } from "@jest/globals";
import TableRepository from "../TableRepository.js";

describe("TableRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new TableRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter(
			(name) => name !== "constructor"
		);

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("TABLE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
