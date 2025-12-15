import { jest } from "@jest/globals";
import DeletePromotionRuleUsecase from "../DeletePromotionRuleUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("DeletePromotionRuleUsecase", () => {
	let promotionRuleService;
	let usecase;

	beforeEach(() => {
		promotionRuleService = { deletePromotionRule: jest.fn() };
		usecase = new DeletePromotionRuleUsecase({ promotionRuleService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeletePromotionRuleUsecase()).toThrow("PROMOTION_RULE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		promotionRuleService.deletePromotionRule.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Promotion rule not found"));
	});

	test("should delete promotion rule", async () => {
		promotionRuleService.deletePromotionRule.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(promotionRuleService.deletePromotionRule).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
