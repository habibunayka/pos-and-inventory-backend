import { jest } from "@jest/globals";
import DeleteInventoryStockDailyUsecase from "../DeleteInventoryStockDailyUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("DeleteInventoryStockDailyUsecase", () => {
	let inventoryStockDailyService;
	let usecase;

	beforeEach(() => {
		inventoryStockDailyService = { delete: jest.fn() };
		usecase = new DeleteInventoryStockDailyUsecase({ inventoryStockDailyService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteInventoryStockDailyUsecase()).toThrow("DELETE_ISD.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be positive integer"));
	});

	test("should throw when deletion fails", async () => {
		inventoryStockDailyService.delete.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Inventory stock daily not found"));
	});

	test("should delete when found", async () => {
		inventoryStockDailyService.delete.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(inventoryStockDailyService.delete).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
