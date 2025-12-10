import { describe, expect, it } from "@jest/globals";
import MenuPriceRepository from "../MenuPriceRepository.js";

describe("MenuPriceRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new MenuPriceRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter((name) => name !== "constructor");

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("MENUPRICE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
