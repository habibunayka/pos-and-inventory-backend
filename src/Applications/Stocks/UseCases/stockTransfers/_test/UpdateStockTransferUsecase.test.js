import { jest } from "@jest/globals";
import UpdateStockTransferUsecase from "../UpdateStockTransferUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("UpdateStockTransferUsecase", () => {
	let stockTransferService;
	let usecase;

	beforeEach(() => {
		stockTransferService = { updateStockTransfer: jest.fn() };
		usecase = new UpdateStockTransferUsecase({ stockTransferService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateStockTransferUsecase()).toThrow("UPDATE_STOCK_TRANSFER.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when qty invalid", async () => {
		await expect(usecase.execute(1, { qty: "abc" })).rejects.toThrow(
			new ValidationError("qty must be a number")
		);
	});

	test("should validate positive integer fields", async () => {
		await expect(usecase.execute(1, { fromPlaceId: "abc" })).rejects.toThrow(
			new ValidationError("fromPlaceId must be a positive integer")
		);
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when record not found", async () => {
		stockTransferService.updateStockTransfer.mockResolvedValue(null);

		await expect(usecase.execute(1, { qty: 1 })).rejects.toThrow(
			new ValidationError("Stock transfer not found")
		);
	});

	test("should update stock transfer with normalized payload", async () => {
		const updated = { id: 2 };
		stockTransferService.updateStockTransfer.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			fromPlaceId: "1",
			toPlaceId: "2",
			ingredientId: "3",
			qty: "4",
			unitId: "5",
			note: "  note "
		});

		expect(stockTransferService.updateStockTransfer).toHaveBeenCalledWith({
			id: 2,
			data: {
				fromPlaceId: 1,
				toPlaceId: 2,
				ingredientId: 3,
				qty: 4,
				unitId: 5,
				note: "note"
			}
		});
		expect(result).toEqual(updated);
	});
});
