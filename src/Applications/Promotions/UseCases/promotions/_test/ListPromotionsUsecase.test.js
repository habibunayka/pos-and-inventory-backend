import { jest } from "@jest/globals";
import ListPromotionsUsecase from "../ListPromotionsUsecase.js";

describe("ListPromotionsUsecase", () => {
	let promotionService;
	let usecase;

	beforeEach(() => {
		promotionService = { listPromotions: jest.fn() };
		usecase = new ListPromotionsUsecase({ promotionService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListPromotionsUsecase()).toThrow("PROMOTION_USECASE.MISSING_SERVICE");
	});

	test("should list promotions", async () => {
		const records = [{ id: 1 }];
		promotionService.listPromotions.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(promotionService.listPromotions).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
