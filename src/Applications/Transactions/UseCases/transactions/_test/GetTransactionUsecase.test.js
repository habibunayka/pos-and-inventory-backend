import { jest } from "@jest/globals";
import GetTransactionUsecase from "../GetTransactionUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../../Commons/Errors/AppError.js";

describe("GetTransactionUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { getTransaction: jest.fn() };
		usecase = new GetTransactionUsecase({ transactionService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetTransactionUsecase()).toThrow("GET_TRANSACTION.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when transaction not found", async () => {
		mockService.getTransaction.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should return transaction when found", async () => {
		const rec = { id: 2 };
		mockService.getTransaction.mockResolvedValue(rec);

		const result = await usecase.execute("2");

		expect(mockService.getTransaction).toHaveBeenCalledWith(2);
		expect(result).toEqual(rec);
	});
});
