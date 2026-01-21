import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import CreatePromotionRuleUsecase from "../CreatePromotionRuleUsecase.js";
import UpdatePromotionRuleUsecase from "../UpdatePromotionRuleUsecase.js";

describe("PromotionRule usecase branch coverage", () => {
	it("CreatePromotionRuleUsecase skips optional props", async () => {
		const service = { createPromotionRule: jest.fn().mockResolvedValue({}) };
		const usecase = new CreatePromotionRuleUsecase({ promotionRuleService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
		await expect(usecase.execute({ promotionId: 1 })).rejects.toThrow(new ValidationError("name is required"));
		await usecase.execute({ promotionId: 1, name: "rule" });
		expect(service.createPromotionRule).toHaveBeenCalledWith({ promotionId: 1, name: "rule" });
	});

	it("UpdatePromotionRuleUsecase handles defaults and nullish fields", async () => {
		const promotionRuleService = { updatePromotionRule: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new UpdatePromotionRuleUsecase({ promotionRuleService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);

		await usecase.execute(1, { name: null, type: null });
		expect(promotionRuleService.updatePromotionRule).toHaveBeenCalledWith({
			id: 1,
			data: { name: "", type: null }
		});
	});
});
