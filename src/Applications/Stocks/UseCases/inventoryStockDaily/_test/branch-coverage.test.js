import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import CreateInventoryStockDailyUsecase from "../CreateInventoryStockDailyUsecase.js";
import UpdateInventoryStockDailyUsecase from "../UpdateInventoryStockDailyUsecase.js";

describe("Inventory stock daily usecase branch coverage", () => {
	it("CreateInventoryStockDailyUsecase handles diffQty values", async () => {
		const inventoryStockDailyService = { create: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateInventoryStockDailyUsecase({ inventoryStockDailyService });

		await usecase.execute({ placeId: 1, ingredientId: 2, diffQty: 5 });
		expect(inventoryStockDailyService.create).toHaveBeenCalledWith(
			expect.objectContaining({ diffQty: 5 })
		);
	});

	it("UpdateInventoryStockDailyUsecase handles defaults and null date", async () => {
		const inventoryStockDailyService = { update: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new UpdateInventoryStockDailyUsecase({ inventoryStockDailyService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);

		await usecase.execute(1, { date: null });
		expect(inventoryStockDailyService.update).toHaveBeenCalledWith({
			id: 1,
			data: { date: null }
		});
	});
});
