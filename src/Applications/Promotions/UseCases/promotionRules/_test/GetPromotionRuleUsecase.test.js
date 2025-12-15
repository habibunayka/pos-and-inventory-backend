import { jest } from "@jest/globals";
import GetPromotionRuleUsecase from "../GetPromotionRuleUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("GetPromotionRuleUsecase", () => {
	let promotionRuleService;
	let usecase;

	beforeEach(() => {
		promotionRuleService = { getPromotionRule: jest.fn() };
		usecase = new GetPromotionRuleUsecase({ promotionRuleService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetPromotionRuleUsecase()).toThrow("PROMOTION_RULE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when rule not found", async () => {
		promotionRuleService.getPromotionRule.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Promotion rule not found"));
	});

	test("should return rule when found", async () => {
		promotionRuleService.getPromotionRule.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(promotionRuleService.getPromotionRule).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
