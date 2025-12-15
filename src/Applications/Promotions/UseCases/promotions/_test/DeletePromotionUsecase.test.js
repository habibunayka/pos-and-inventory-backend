import { jest } from "@jest/globals";
import DeletePromotionUsecase from "../DeletePromotionUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("DeletePromotionUsecase", () => {
	let promotionService;
	let usecase;

	beforeEach(() => {
		promotionService = { delete: jest.fn() };
		usecase = new DeletePromotionUsecase({ promotionService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeletePromotionUsecase()).toThrow("DELETE_PROMOTION.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be positive integer"));
	});

	test("should throw when deletion fails", async () => {
		promotionService.delete.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Promotion not found"));
	});

	test("should delete promotion", async () => {
		promotionService.delete.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(promotionService.delete).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
