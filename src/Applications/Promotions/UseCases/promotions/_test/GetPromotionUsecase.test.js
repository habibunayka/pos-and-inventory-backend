import { jest } from "@jest/globals";
import GetPromotionUsecase from "../GetPromotionUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../../Commons/Errors/AppError.js";

describe("GetPromotionUsecase", () => {
	let promotionService;
	let usecase;

	beforeEach(() => {
		promotionService = { getPromotion: jest.fn() };
		usecase = new GetPromotionUsecase({ promotionService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetPromotionUsecase()).toThrow("PROMOTION_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when promotion not found", async () => {
		promotionService.getPromotion.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should return promotion when found", async () => {
		promotionService.getPromotion.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(promotionService.getPromotion).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
