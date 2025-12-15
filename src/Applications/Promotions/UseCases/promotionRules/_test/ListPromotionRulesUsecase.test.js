import { jest } from "@jest/globals";
import ListPromotionRulesUsecase from "../ListPromotionRulesUsecase.js";

describe("ListPromotionRulesUsecase", () => {
	let promotionRuleService;
	let usecase;

	beforeEach(() => {
		promotionRuleService = { listPromotionRules: jest.fn() };
		usecase = new ListPromotionRulesUsecase({ promotionRuleService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListPromotionRulesUsecase()).toThrow("PROMOTION_RULE_USECASE.MISSING_SERVICE");
	});

	test("should list promotion rules", async () => {
		const records = [{ id: 1 }];
		promotionRuleService.listPromotionRules.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(promotionRuleService.listPromotionRules).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
