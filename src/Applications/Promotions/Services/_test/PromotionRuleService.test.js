import { jest } from "@jest/globals";
import PromotionRuleService from "../PromotionRuleService.js";

describe("PromotionRuleService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createPromotionRule: jest.fn(),
			deletePromotionRule: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new PromotionRuleService()).toThrow("PROMOTION_RULE_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new PromotionRuleService({ promotionRuleRepository: badRepo })).toThrow(
			"PROMOTION_RULE_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listPromotionRules should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new PromotionRuleService({ promotionRuleRepository: mockRepo });

		const result = service.listPromotionRules();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getPromotionRule should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new PromotionRuleService({ promotionRuleRepository: mockRepo });

		const result = service.getPromotionRule(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createPromotionRule should delegate to repository", async () => {
		mockRepo.createPromotionRule.mockResolvedValue({ id: 3 });
		const service = new PromotionRuleService({ promotionRuleRepository: mockRepo });

		const result = service.createPromotionRule({ name: "rule" });

		expect(mockRepo.createPromotionRule).toHaveBeenCalledWith({ name: "rule" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("deletePromotionRule should delegate to repository", async () => {
		mockRepo.deletePromotionRule.mockResolvedValue(true);
		const service = new PromotionRuleService({ promotionRuleRepository: mockRepo });

		const result = service.deletePromotionRule(4);

		expect(mockRepo.deletePromotionRule).toHaveBeenCalledWith(4);
		await expect(result).resolves.toBe(true);
	});
});
