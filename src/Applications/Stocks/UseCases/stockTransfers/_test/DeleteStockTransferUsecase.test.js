import { jest } from "@jest/globals";
import DeleteStockTransferUsecase from "../DeleteStockTransferUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("DeleteStockTransferUsecase", () => {
	let stockTransferService;
	let usecase;

	beforeEach(() => {
		stockTransferService = { deleteStockTransfer: jest.fn() };
		usecase = new DeleteStockTransferUsecase({ stockTransferService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteStockTransferUsecase()).toThrow("DELETE_STOCK_TRANSFER.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		stockTransferService.deleteStockTransfer.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Stock transfer not found"));
	});

	test("should delete stock transfer", async () => {
		stockTransferService.deleteStockTransfer.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(stockTransferService.deleteStockTransfer).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
