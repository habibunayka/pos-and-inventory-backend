import { jest } from "@jest/globals";
import UpdateInventoryStockDailyUsecase from "../UpdateInventoryStockDailyUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("UpdateInventoryStockDailyUsecase", () => {
	let inventoryStockDailyService;
	let usecase;

	beforeEach(() => {
		inventoryStockDailyService = { update: jest.fn() };
		usecase = new UpdateInventoryStockDailyUsecase({ inventoryStockDailyService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateInventoryStockDailyUsecase()).toThrow("UPDATE_ISD.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be positive integer"));
	});

	test("should throw when payload not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when qty invalid", async () => {
		await expect(usecase.execute(1, { openingQty: "abc" })).rejects.toThrow(
			new ValidationError("openingQty must be a number")
		);
	});

	test("should validate closingQty and diffQty numbers", async () => {
		await expect(usecase.execute(1, { closingQty: "bad" })).rejects.toThrow(
			new ValidationError("closingQty must be a number")
		);

		await expect(usecase.execute(1, { diffQty: "bad" })).rejects.toThrow(
			new ValidationError("diffQty must be a number")
		);
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No fields to update"));
	});

	test("should normalize numeric diffQty", async () => {
		inventoryStockDailyService.update.mockResolvedValue({ id: 3 });

		await usecase.execute(3, { diffQty: "7" });

		expect(inventoryStockDailyService.update).toHaveBeenCalledWith({
			id: 3,
			data: { diffQty: 7 }
		});
	});

	test("should throw when record not found", async () => {
		inventoryStockDailyService.update.mockResolvedValue(null);

		await expect(usecase.execute(1, { openingQty: 1 })).rejects.toThrow(
			new ValidationError("Inventory stock daily not found")
		);
	});

	test("should update inventory stock daily with normalized payload", async () => {
		const updated = { id: 2 };
		inventoryStockDailyService.update.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			placeId: "1",
			ingredientId: "2",
			date: "2023-01-01T00:00:00.000Z",
			openingQty: "10",
			closingQty: "5",
			diffQty: null
		});

		expect(inventoryStockDailyService.update).toHaveBeenCalledWith({
			id: 2,
			data: {
				placeId: 1,
				ingredientId: 2,
				date: expect.any(Date),
				openingQty: 10,
				closingQty: 5,
				diffQty: null
			}
		});
		expect(result).toEqual(updated);
	});
});
