import { describe, expect, it } from "@jest/globals";
import PromotionRuleRepository from "../PromotionRuleRepository.js";

describe("PromotionRuleRepository", () => {
	it("throws for every unimplemented method", async () => {
		const repository = new PromotionRuleRepository();
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(repository)).filter((name) => name !== "constructor");

		for (const method of methods) {
			// Passing an object works with both destructured and direct params
			await expect(repository[method]({})).rejects.toThrow("PROMOTION_RULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
		}
	});
});
