import { jest } from "@jest/globals";
import CreatePromotionRuleUsecase from "../CreatePromotionRuleUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CreatePromotionRuleUsecase", () => {
	let promotionRuleService;
	let usecase;

	beforeEach(() => {
		promotionRuleService = { createPromotionRule: jest.fn() };
		usecase = new CreatePromotionRuleUsecase({ promotionRuleService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreatePromotionRuleUsecase()).toThrow("PROMOTION_RULE_USECASE.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when promotionId invalid", async () => {
		await expect(usecase.execute({ promotionId: "abc", name: "rule" })).rejects.toThrow(
			new ValidationError("promotionId must be a positive integer")
		);
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ promotionId: 1, name: "   " })).rejects.toThrow(
			new ValidationError("name is required")
		);
	});

	test("should create promotion rule with normalized payload", async () => {
		const created = { id: 1 };
		promotionRuleService.createPromotionRule.mockResolvedValue(created);

		const result = await usecase.execute({
			promotionId: "2",
			name: " Rule ",
			type: "discount",
			criteriaJson: { a: 1 },
			applyJson: null
		});

		expect(promotionRuleService.createPromotionRule).toHaveBeenCalledWith({
			promotionId: 2,
			name: "Rule",
			type: "discount",
			criteriaJson: { a: 1 },
			applyJson: null
		});
		expect(result).toEqual(created);
	});
});
