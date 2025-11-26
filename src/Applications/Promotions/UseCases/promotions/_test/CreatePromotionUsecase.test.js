import { jest } from "@jest/globals";
import CreatePromotionUsecase from "../CreatePromotionUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CreatePromotionUsecase", () => {
	let promotionService;
	let usecase;

	beforeEach(() => {
		promotionService = { createPromotion: jest.fn() };
		usecase = new CreatePromotionUsecase({ promotionService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreatePromotionUsecase()).toThrow("PROMOTION_USECASE.MISSING_SERVICE");
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ name: "   " })).rejects.toThrow(new ValidationError("name is required"));
	});

	test("should create promotion with normalized data", async () => {
		const created = { id: 1 };
		promotionService.createPromotion.mockResolvedValue(created);

		const result = await usecase.execute({
			name: " Promo ",
			description: null,
			startDate: "2023-01-01T00:00:00.000Z",
			endDate: null,
			isActive: true
		});

		expect(promotionService.createPromotion).toHaveBeenCalledWith({
			name: "Promo",
			description: null,
			startDate: expect.any(Date),
			endDate: null,
			isActive: true
		});
		expect(result).toEqual(created);
	});
});
