import { jest } from "@jest/globals";
import ListTransactionsUsecase from "../ListTransactionsUsecase.js";

describe("ListTransactionsUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { listTransactions: jest.fn() };
		usecase = new ListTransactionsUsecase({ transactionService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListTransactionsUsecase()).toThrow("LIST_TRANSACTIONS.MISSING_SERVICE");
	});

	test("should list transactions", async () => {
		const records = [{ id: 1 }];
		mockService.listTransactions.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(mockService.listTransactions).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
