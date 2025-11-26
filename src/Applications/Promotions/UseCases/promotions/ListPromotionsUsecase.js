export default class ListPromotionsUsecase {
	constructor({ promotionService } = {}) {
		if (!promotionService) throw new Error("PROMOTION_USECASE.MISSING_SERVICE");
		this.promotionService = promotionService;
	}
	async execute() {
		return this.promotionService.listPromotions();
	}
}
