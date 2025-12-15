import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../../Commons/Constants/HttpStatus.js";

export default class GetPromotionUsecase {
	constructor({ promotionService } = {}) {
		if (!promotionService) throw new Error("PROMOTION_USECASE.MISSING_SERVICE");
		this.promotionService = promotionService;
	}
	async execute(id) {
		const intId = Number(id);
		if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError("id must be a positive integer");
		const rec = await this.promotionService.getPromotion(intId);
		if (!rec) throw new AppError("Promotion not found", HttpStatus.NOT_FOUND);
		return rec;
	}
}
