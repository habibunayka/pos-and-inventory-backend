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

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
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

	test("should handle optional fields being omitted or falsey", async () => {
		promotionService.createPromotion.mockResolvedValue({});

		await usecase.execute({ name: "NoDates" });
		expect(promotionService.createPromotion).toHaveBeenCalledWith({ name: "NoDates" });

		await usecase.execute({
			name: "NullDates",
			startDate: "",
			endDate: "",
			isActive: false
		});
		expect(promotionService.createPromotion).toHaveBeenLastCalledWith({
			name: "NullDates",
			startDate: null,
			endDate: null,
			isActive: false
		});
	});
});
