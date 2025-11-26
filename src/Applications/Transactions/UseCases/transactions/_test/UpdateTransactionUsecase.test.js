import { jest } from "@jest/globals";
import UpdateTransactionUsecase from "../UpdateTransactionUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../../Commons/Errors/AppError.js";

describe("UpdateTransactionUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { updateTransaction: jest.fn() };
		usecase = new UpdateTransactionUsecase({ transactionService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateTransactionUsecase()).toThrow("UPDATE_TRANSACTION.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when transaction not found", async () => {
		mockService.updateTransaction.mockResolvedValue(null);

		await expect(usecase.execute(1, { total: 100 })).rejects.toThrow(AppError);
	});

	test("should update transaction with normalized payload", async () => {
		const updated = { id: 2, total: 150, discount: null };
		mockService.updateTransaction.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			cashierId: "3",
			placeId: "4",
			tableId: null,
			orderType: " takeout ",
			total: "150",
			tax: "10",
			discount: null,
			paymentMethodId: "5"
		});

		expect(mockService.updateTransaction).toHaveBeenCalledWith({
			id: 2,
			data: {
				cashierId: 3,
				placeId: 4,
				tableId: null,
				orderType: "takeout",
				total: 150,
				tax: 10,
				discount: null,
				paymentMethodId: 5
			}
		});
		expect(result).toEqual(updated);
	});
});
