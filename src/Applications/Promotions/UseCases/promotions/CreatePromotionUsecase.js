import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class CreatePromotionUsecase {
	constructor({ promotionService } = {}) {
		if (!promotionService) throw new Error("PROMOTION_USECASE.MISSING_SERVICE");
		this.promotionService = promotionService;
	}
	async execute(payload = {}) {
		if (typeof payload !== "object" || payload === null || Array.isArray(payload))
			throw new ValidationError("Payload must be an object");
		const name = String(payload.name ?? "").trim();
		if (!name) throw new ValidationError("name is required");

		const data = { name };
		if (payload.description !== undefined) data.description = payload.description;
		if (payload.startDate !== undefined) data.startDate = payload.startDate ? new Date(payload.startDate) : null;
		if (payload.endDate !== undefined) data.endDate = payload.endDate ? new Date(payload.endDate) : null;
		if (payload.isActive !== undefined) data.isActive = Boolean(payload.isActive);

		return this.promotionService.createPromotion(data);
	}
}
