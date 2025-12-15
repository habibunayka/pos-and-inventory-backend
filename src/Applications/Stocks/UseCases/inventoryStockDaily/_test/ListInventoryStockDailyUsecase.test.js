import { jest } from "@jest/globals";
import ListInventoryStockDailyUsecase from "../ListInventoryStockDailyUsecase.js";

describe("ListInventoryStockDailyUsecase", () => {
	let inventoryStockDailyService;
	let usecase;

	beforeEach(() => {
		inventoryStockDailyService = { list: jest.fn() };
		usecase = new ListInventoryStockDailyUsecase({ inventoryStockDailyService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListInventoryStockDailyUsecase()).toThrow("LIST_ISD.MISSING_SERVICE");
	});

	test("should list inventory stock dailies", async () => {
		const records = [{ id: 1 }];
		inventoryStockDailyService.list.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(inventoryStockDailyService.list).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
