import { jest } from "@jest/globals";
import PromotionService from "../PromotionService.js";

describe("PromotionService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createPromotion: jest.fn(),
			updatePromotion: jest.fn(),
			deletePromotion: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new PromotionService()).toThrow("PROMOTION_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new PromotionService({ promotionRepository: badRepo })).toThrow(
			"PROMOTION_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listPromotions should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new PromotionService({ promotionRepository: mockRepo });

		const result = service.listPromotions();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getPromotion should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new PromotionService({ promotionRepository: mockRepo });

		const result = service.getPromotion(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createPromotion should delegate to repository", async () => {
		mockRepo.createPromotion.mockResolvedValue({ id: 3 });
		const service = new PromotionService({ promotionRepository: mockRepo });

		const result = service.createPromotion({ name: "promo" });

		expect(mockRepo.createPromotion).toHaveBeenCalledWith({ name: "promo" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updatePromotion should delegate to repository", async () => {
		mockRepo.updatePromotion.mockResolvedValue({ id: 4 });
		const service = new PromotionService({ promotionRepository: mockRepo });

		const result = service.updatePromotion({ id: 4, data: { name: "new" } });

		expect(mockRepo.updatePromotion).toHaveBeenCalledWith({ id: 4, data: { name: "new" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deletePromotion should delegate to repository", async () => {
		mockRepo.deletePromotion.mockResolvedValue(true);
		const service = new PromotionService({ promotionRepository: mockRepo });

		const result = service.deletePromotion(5);

		expect(mockRepo.deletePromotion).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
