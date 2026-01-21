import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import CreatePromotionUsecase from "../CreatePromotionUsecase.js";
import UpdatePromotionUsecase from "../UpdatePromotionUsecase.js";

describe("Promotions usecase branch coverage", () => {
	it("CreatePromotionUsecase handles defaults and dates", async () => {
		const promotionService = { createPromotion: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new CreatePromotionUsecase({ promotionService });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);

		await usecase.execute({ name: "Promo", startDate: null });
		expect(promotionService.createPromotion).toHaveBeenCalledWith({ name: "Promo", startDate: null });
	});

	it("UpdatePromotionUsecase handles defaults and null dates", async () => {
		const promotionService = {
			getPromotion: jest.fn().mockResolvedValue({ id: 1 }),
			updatePromotion: jest.fn().mockResolvedValue({ id: 1 })
		};
		const usecase = new UpdatePromotionUsecase({ promotionService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);

		await usecase.execute(1, { name: null, startDate: null, endDate: null });
		expect(promotionService.updatePromotion).toHaveBeenCalledWith({
			id: 1,
			data: { name: "", startDate: null, endDate: null }
		});
	});
});
