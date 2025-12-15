import { jest } from "@jest/globals";
import DeletePlaceStockUsecase from "../DeletePlaceStockUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("DeletePlaceStockUsecase", () => {
	let placeStockService;
	let usecase;

	beforeEach(() => {
		placeStockService = { deletePlaceStock: jest.fn() };
		usecase = new DeletePlaceStockUsecase({ placeStockService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeletePlaceStockUsecase()).toThrow("DELETE_PLACESTOCK.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be positive integer"));
	});

	test("should throw when deletion fails", async () => {
		placeStockService.deletePlaceStock.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Place stock not found"));
	});

	test("should delete place stock", async () => {
		placeStockService.deletePlaceStock.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(placeStockService.deletePlaceStock).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
