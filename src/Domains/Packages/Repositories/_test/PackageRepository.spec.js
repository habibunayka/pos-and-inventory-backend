import { describe, expect, it } from "@jest/globals";
import PackageRepository from "../PackageRepository.js";

describe("PackageRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new PackageRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter((name) => name !== "constructor");

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("PACKAGE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
