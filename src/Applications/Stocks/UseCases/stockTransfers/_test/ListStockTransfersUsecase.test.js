import { jest } from "@jest/globals";
import ListStockTransfersUsecase from "../ListStockTransfersUsecase.js";

describe("ListStockTransfersUsecase", () => {
	let stockTransferService;
	let usecase;

	beforeEach(() => {
		stockTransferService = { listStockTransfers: jest.fn() };
		usecase = new ListStockTransfersUsecase({ stockTransferService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListStockTransfersUsecase()).toThrow("LIST_STOCK_TRANSFERS.MISSING_SERVICE");
	});

	test("should list stock transfers", async () => {
		const records = [{ id: 1 }];
		stockTransferService.listStockTransfers.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(stockTransferService.listStockTransfers).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
