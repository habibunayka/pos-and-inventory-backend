import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../../Commons/Constants/HttpStatus.js";

export default class UpdatePromotionUsecase {
	constructor({ promotionService } = {}) {
		if (!promotionService) throw new Error("PROMOTION_USECASE.MISSING_SERVICE");
		this.promotionService = promotionService;
	}
	async execute(id, payload = {}) {
		const intId = Number(id);
		if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError("id must be a positive integer");
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new ValidationError("Payload must be an object");
		}

		const existing = await this.promotionService.getPromotion(intId);
		if (!existing) {
			throw new AppError("Promotion not found", HttpStatus.NOT_FOUND);
		}

		const data = {};
		if (payload.name !== undefined) data.name = String(payload.name ?? "").trim();
		if (payload.description !== undefined) data.description = payload.description;
		if (payload.startDate !== undefined) data.startDate = payload.startDate ? new Date(payload.startDate) : null;
		if (payload.endDate !== undefined) data.endDate = payload.endDate ? new Date(payload.endDate) : null;
		if (payload.isActive !== undefined) data.isActive = Boolean(payload.isActive);

		if (Object.keys(data).length === 0) {
			throw new ValidationError("No fields to update");
		}

		const updated = await this.promotionService.updatePromotion({ id: intId, data });
		if (!updated) {
			throw new AppError("Promotion not found", HttpStatus.NOT_FOUND);
		}
		return updated;
	}
}
