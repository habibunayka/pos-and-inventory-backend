import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class UpdatePromotionRuleUsecase {
	constructor({ promotionRuleService } = {}) {
		if (!promotionRuleService) throw new Error("PROMOTION_RULE_USECASE.MISSING_SERVICE");
		this.promotionRuleService = promotionRuleService;
	}

	async execute(id, payload = {}) {
		const numericId = Number(id);
		if (!Number.isInteger(numericId) || numericId <= 0) {
			throw new ValidationError("id must be a positive integer");
		}

		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new ValidationError("Payload must be an object");
		}

		const data = {};
		if (Object.prototype.hasOwnProperty.call(payload, "promotionId")) {
			const promotionId = Number(payload.promotionId);
			if (!Number.isInteger(promotionId) || promotionId <= 0) {
				throw new ValidationError("promotionId must be a positive integer");
			}
			data.promotionId = promotionId;
		}
		if (Object.prototype.hasOwnProperty.call(payload, "name")) {
			data.name = String(payload.name ?? "").trim();
		}
		if (Object.prototype.hasOwnProperty.call(payload, "type")) {
			data.type = payload.type == null ? null : String(payload.type).trim();
		}
		if (Object.prototype.hasOwnProperty.call(payload, "criteriaJson")) {
			data.criteriaJson = payload.criteriaJson;
		}
		if (Object.prototype.hasOwnProperty.call(payload, "applyJson")) {
			data.applyJson = payload.applyJson;
		}

		if (Object.keys(data).length === 0) {
			throw new ValidationError("No fields to update");
		}

		const updated = await this.promotionRuleService.updatePromotionRule({ id: numericId, data });
		if (!updated) throw new ValidationError("Promotion rule not found");
		return updated;
	}
}
