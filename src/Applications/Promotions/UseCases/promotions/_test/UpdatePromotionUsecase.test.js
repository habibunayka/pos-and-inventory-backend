import { jest } from "@jest/globals";
import UpdatePromotionUsecase from "../UpdatePromotionUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../../Commons/Errors/AppError.js";

describe("UpdatePromotionUsecase", () => {
	let promotionService;
	let usecase;

	beforeEach(() => {
		promotionService = { getPromotion: jest.fn(), updatePromotion: jest.fn() };
		usecase = new UpdatePromotionUsecase({ promotionService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdatePromotionUsecase()).toThrow("PROMOTION_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when promotion not found", async () => {
		promotionService.getPromotion.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "Promo" })).rejects.toThrow(AppError);
	});

	test("should throw when no fields provided", async () => {
		promotionService.getPromotion.mockResolvedValue({ id: 1 });

		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No fields to update"));
	});

	test("should update promotion with normalized payload", async () => {
		promotionService.getPromotion.mockResolvedValue({ id: 1 });
		promotionService.updatePromotion.mockResolvedValue({ id: 1, name: "Promo" });

		const result = await usecase.execute("1", {
			name: " Promo ",
			description: null,
			startDate: "2023-01-01T00:00:00.000Z",
			endDate: null,
			isActive: false
		});

		expect(promotionService.updatePromotion).toHaveBeenCalledWith({
			id: 1,
			data: {
				name: "Promo",
				description: null,
				startDate: expect.any(Date),
				endDate: null,
				isActive: false
			}
		});
		expect(result).toEqual({ id: 1, name: "Promo" });
	});

	test("should throw when update target no longer exists", async () => {
		promotionService.getPromotion.mockResolvedValue({ id: 2 });
		promotionService.updatePromotion.mockResolvedValue(null);

		await expect(usecase.execute(2, { name: "X" })).rejects.toThrow(AppError);
	});
});
