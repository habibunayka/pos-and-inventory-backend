import { jest } from "@jest/globals";
import ListPlaceStocksUsecase from "../ListPlaceStocksUsecase.js";

describe("ListPlaceStocksUsecase", () => {
	let placeStockService;
	let usecase;

	beforeEach(() => {
		placeStockService = { listPlaceStocks: jest.fn() };
		usecase = new ListPlaceStocksUsecase({ placeStockService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListPlaceStocksUsecase()).toThrow("LIST_PLACESTOCKS.MISSING_SERVICE");
	});

	test("should list place stocks", async () => {
		const records = [{ id: 1 }];
		placeStockService.listPlaceStocks.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(placeStockService.listPlaceStocks).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
