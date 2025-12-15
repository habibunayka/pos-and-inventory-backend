export default class ListPromotionRulesUsecase {
	constructor({ promotionRuleService } = {}) {
		if (!promotionRuleService) throw new Error("PROMOTION_RULE_USECASE.MISSING_SERVICE");
		this.promotionRuleService = promotionRuleService;
	}
	async execute() {
		return this.promotionRuleService.listPromotionRules();
	}
}
