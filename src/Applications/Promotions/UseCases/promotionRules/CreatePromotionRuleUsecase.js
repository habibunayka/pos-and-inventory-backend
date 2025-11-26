import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class CreatePromotionRuleUsecase {
	constructor({ promotionRuleService } = {}) {
		if (!promotionRuleService) throw new Error("PROMOTION_RULE_USECASE.MISSING_SERVICE");
		this.promotionRuleService = promotionRuleService;
	}
	async execute(payload = {}) {
		if (typeof payload !== "object" || payload === null || Array.isArray(payload))
			throw new ValidationError("Payload must be an object");

		const promotionId = Number(payload.promotionId);
		if (!Number.isInteger(promotionId) || promotionId <= 0) {
			throw new ValidationError("promotionId must be a positive integer");
		}

		const name = String(payload.name ?? "").trim();
		if (!name) throw new ValidationError("name is required");

		const data = {
			promotionId,
			name
		};
		if (payload.type !== undefined) data.type = payload.type;
		if (payload.criteriaJson !== undefined) data.criteriaJson = payload.criteriaJson;
		if (payload.applyJson !== undefined) data.applyJson = payload.applyJson;

		return this.promotionRuleService.createPromotionRule(data);
	}
}
