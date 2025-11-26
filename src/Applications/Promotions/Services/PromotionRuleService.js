import PromotionRuleRepository from "../../../Domains/Promotions/Repositories/PromotionRuleRepository.js";

export default class PromotionRuleService {
	constructor({ promotionRuleRepository } = {}) {
		if (!promotionRuleRepository) throw new Error("PROMOTION_RULE_SERVICE.MISSING_REPOSITORY");
		if (!(promotionRuleRepository instanceof PromotionRuleRepository)) {
			const req = ["findAll", "findById", "createPromotionRule", "deletePromotionRule"];
			const miss = req.find((m) => typeof promotionRuleRepository[m] !== "function");
			if (miss) throw new Error(`PROMOTION_RULE_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
		}
		this._repo = promotionRuleRepository;
	}
	listPromotionRules() {
		return this._repo.findAll();
	}
	getPromotionRule(id) {
		return this._repo.findById(id);
	}
	createPromotionRule(data) {
		return this._repo.createPromotionRule(data);
	}
	deletePromotionRule(id) {
		return this._repo.deletePromotionRule(id);
	}
}
