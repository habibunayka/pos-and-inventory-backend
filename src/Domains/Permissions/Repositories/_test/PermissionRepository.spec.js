import { describe, expect, it } from "@jest/globals";
import PermissionRepository from "../PermissionRepository.js";

describe("PermissionRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new PermissionRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter((name) => name !== "constructor");

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("PERMISSION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
