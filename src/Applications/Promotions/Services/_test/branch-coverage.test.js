import { describe, expect, it } from "@jest/globals";
import PromotionRuleService from "../PromotionRuleService.js";
import PromotionService from "../PromotionService.js";
import PromotionRuleRepository from "../../../../Domains/Promotions/Repositories/PromotionRuleRepository.js";
import PromotionRepository from "../../../../Domains/Promotions/Repositories/PromotionRepository.js";

describe("Promotion services constructor coverage", () => {
	const cases = [
		{ Service: PromotionRuleService, Repo: PromotionRuleRepository, key: "promotionRuleRepository" },
		{ Service: PromotionService, Repo: PromotionRepository, key: "promotionRepository" }
	];

	it.each(cases)("accepts repository instance for %p", ({ Service, Repo, key }) => {
		const repo = new Repo();
		const service = new Service({ [key]: repo });
		expect(service).toBeInstanceOf(Service);
	});
});
