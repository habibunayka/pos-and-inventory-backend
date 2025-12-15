import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class DeletePromotionRuleUsecase {
	constructor({ promotionRuleService } = {}) {
		if (!promotionRuleService) throw new Error("PROMOTION_RULE_USECASE.MISSING_SERVICE");
		this.promotionRuleService = promotionRuleService;
	}
	async execute(id) {
		const intId = Number(id);
		if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError("id must be a positive integer");
		const ok = await this.promotionRuleService.deletePromotionRule(intId);
		if (!ok) throw new ValidationError("Promotion rule not found");
		return true;
	}
}
