import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../../Commons/Constants/HttpStatus.js";

export default class UpdatePromotionUsecase {
	constructor({ promotionService } = {}) {
		if (!promotionService) throw new Error("UPDATE_PROMOTION.MISSING_SERVICE");
		this.promotionService = promotionService;
	}
	async execute(id, payload = {}) {
		const intId = Number(id);
		if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError("id must be positive integer");
		if (typeof payload !== "object" || payload === null || Array.isArray(payload))
			throw new ValidationError("Payload must be an object");
		const data = {};
		if (payload.placeId !== undefined) data.placeId = payload.placeId == null ? null : Number(payload.placeId);
		if (payload.name !== undefined) data.name = String(payload.name ?? "").trim() || null;
		if (payload.startAt !== undefined) data.startAt = payload.startAt ? new Date(payload.startAt) : null;
		if (payload.endAt !== undefined) data.endAt = payload.endAt ? new Date(payload.endAt) : null;
		const updated = await this.promotionService.update({ id: intId, data });
		if (!updated) {
			throw new AppError("Promotion not found", HttpStatus.NOT_FOUND);
		}
		return updated;
	}
}
