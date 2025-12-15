import { describe, expect, it } from "@jest/globals";
import ActivityLogRepository from "../ActivityLogRepository.js";

describe("ActivityLogRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new ActivityLogRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter((name) => name !== "constructor");

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("ACTIVITYLOG_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
