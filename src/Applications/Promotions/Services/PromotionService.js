import PromotionRepository from "../../../Domains/Promotions/Repositories/PromotionRepository.js";

export default class PromotionService {
	constructor({ promotionRepository } = {}) {
		if (!promotionRepository) throw new Error("PROMOTION_SERVICE.MISSING_REPOSITORY");
		if (!(promotionRepository instanceof PromotionRepository)) {
			const req = ["findAll", "findById", "createPromotion", "updatePromotion", "deletePromotion"];
			const miss = req.find((m) => typeof promotionRepository[m] !== "function");
			if (miss) throw new Error(`PROMOTION_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
		}
		this._repo = promotionRepository;
	}
	listPromotions() {
		return this._repo.findAll();
	}
	getPromotion(id) {
		return this._repo.findById(id);
	}
	createPromotion(data) {
		return this._repo.createPromotion(data);
	}
	updatePromotion({ id, data }) {
		return this._repo.updatePromotion({ id, data });
	}
	deletePromotion(id) {
		return this._repo.deletePromotion(id);
	}
}
