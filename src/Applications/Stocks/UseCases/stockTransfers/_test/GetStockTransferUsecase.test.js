import { jest } from "@jest/globals";
import GetStockTransferUsecase from "../GetStockTransferUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("GetStockTransferUsecase", () => {
	let stockTransferService;
	let usecase;

	beforeEach(() => {
		stockTransferService = { getStockTransfer: jest.fn() };
		usecase = new GetStockTransferUsecase({ stockTransferService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetStockTransferUsecase()).toThrow("GET_STOCK_TRANSFER.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when record not found", async () => {
		stockTransferService.getStockTransfer.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Stock transfer not found"));
	});

	test("should return record when found", async () => {
		stockTransferService.getStockTransfer.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(stockTransferService.getStockTransfer).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
