import { jest } from "@jest/globals";
import GetPlaceStockUsecase from "../GetPlaceStockUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("GetPlaceStockUsecase", () => {
	let placeStockService;
	let usecase;

	beforeEach(() => {
		placeStockService = { getPlaceStock: jest.fn() };
		usecase = new GetPlaceStockUsecase({ placeStockService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetPlaceStockUsecase()).toThrow("GET_PLACESTOCK.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be positive integer"));
	});

	test("should throw when record not found", async () => {
		placeStockService.getPlaceStock.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Place stock not found"));
	});

	test("should return place stock when found", async () => {
		placeStockService.getPlaceStock.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(placeStockService.getPlaceStock).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
