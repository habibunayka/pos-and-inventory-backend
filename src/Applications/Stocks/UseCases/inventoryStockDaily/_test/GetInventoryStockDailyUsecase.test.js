import { jest } from "@jest/globals";
import GetInventoryStockDailyUsecase from "../GetInventoryStockDailyUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("GetInventoryStockDailyUsecase", () => {
	let inventoryStockDailyService;
	let usecase;

	beforeEach(() => {
		inventoryStockDailyService = { get: jest.fn() };
		usecase = new GetInventoryStockDailyUsecase({ inventoryStockDailyService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetInventoryStockDailyUsecase()).toThrow("GET_ISD.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be positive integer"));
	});

	test("should throw when record not found", async () => {
		inventoryStockDailyService.get.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Inventory stock daily not found"));
	});

	test("should return record when found", async () => {
		inventoryStockDailyService.get.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(inventoryStockDailyService.get).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
