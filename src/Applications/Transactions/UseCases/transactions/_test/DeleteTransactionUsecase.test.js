import { jest } from "@jest/globals";
import DeleteTransactionUsecase from "../DeleteTransactionUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("DeleteTransactionUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { deleteTransaction: jest.fn() };
		usecase = new DeleteTransactionUsecase({ transactionService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteTransactionUsecase()).toThrow("DELETE_TRANSACTION.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		mockService.deleteTransaction.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Transaction not found"));
	});

	test("should delete transaction", async () => {
		mockService.deleteTransaction.mockResolvedValue(true);

		const result = await usecase.execute("3");

		expect(mockService.deleteTransaction).toHaveBeenCalledWith(3);
		expect(result).toBe(true);
	});
});
