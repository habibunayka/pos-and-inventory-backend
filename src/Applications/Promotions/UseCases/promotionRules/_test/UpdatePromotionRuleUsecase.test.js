import { jest } from "@jest/globals";
import UpdatePromotionRuleUsecase from "../UpdatePromotionRuleUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("UpdatePromotionRuleUsecase", () => {
	let promotionRuleService;
	let usecase;

	beforeEach(() => {
		promotionRuleService = { updatePromotionRule: jest.fn() };
		usecase = new UpdatePromotionRuleUsecase({ promotionRuleService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdatePromotionRuleUsecase()).toThrow("PROMOTION_RULE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No fields to update"));
	});

	test("should throw when promotionId invalid", async () => {
		await expect(usecase.execute(1, { promotionId: "abc" })).rejects.toThrow(
			new ValidationError("promotionId must be a positive integer")
		);
	});

	test("should update promotion rule with normalized data", async () => {
		const updated = { id: 2, name: "Rule" };
		promotionRuleService.updatePromotionRule.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			promotionId: "3",
			name: " Rule ",
			type: "discount",
			criteriaJson: { a: 1 },
			applyJson: null
		});

		expect(promotionRuleService.updatePromotionRule).toHaveBeenCalledWith({
			id: 2,
			data: {
				promotionId: 3,
				name: "Rule",
				type: "discount",
				criteriaJson: { a: 1 },
				applyJson: null
			}
		});
		expect(result).toEqual(updated);
	});
});
