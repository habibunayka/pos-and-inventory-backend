import { jest } from "@jest/globals";
import UpdatePlaceStockUsecase from "../UpdatePlaceStockUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../../Commons/Errors/AppError.js";

describe("UpdatePlaceStockUsecase", () => {
	let placeStockService;
	let usecase;

	beforeEach(() => {
		placeStockService = { updatePlaceStock: jest.fn() };
		usecase = new UpdatePlaceStockUsecase({ placeStockService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdatePlaceStockUsecase()).toThrow("UPDATE_PLACESTOCK.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be positive integer"));
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when record not found", async () => {
		placeStockService.updatePlaceStock.mockResolvedValue(null);

		await expect(usecase.execute(1, { qty: 10 })).rejects.toThrow(AppError);
	});

	test("should update place stock with normalized payload", async () => {
		const updated = { id: 2, qty: 5 };
		placeStockService.updatePlaceStock.mockResolvedValue(updated);

		const result = await usecase.execute("2", { placeId: "1", ingredientId: "2", qty: "5", unitId: "3" });

		expect(placeStockService.updatePlaceStock).toHaveBeenCalledWith({
			id: 2,
			data: { placeId: 1, ingredientId: 2, qty: 5, unitId: 3 }
		});
		expect(result).toEqual(updated);
	});
});
