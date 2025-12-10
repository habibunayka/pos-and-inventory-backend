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

	test("should allow skipping optional fields and handle nullables", async () => {
		const updated = { id: 7, orderType: null };
		mockService.updateTransaction.mockResolvedValue(updated);

		const result = await usecase.execute(7, {
			orderType: null,
			paymentMethodId: null,
			placeId: undefined,
			tableId: undefined,
			tax: undefined,
			discount: undefined
		});

		expect(mockService.updateTransaction).toHaveBeenCalledWith({
			id: 7,
			data: {
				orderType: null,
				paymentMethodId: null
			}
		});
		expect(result).toEqual(updated);
	});

	test("should validate optional ids when provided", async () => {
		await expect(usecase.execute(1, { paymentMethodId: "bad" })).rejects.toThrow(
			new ValidationError("paymentMethodId must be a positive integer")
		);
		await expect(usecase.execute(1, { cashierId: "bad" })).rejects.toThrow(
			new ValidationError("cashierId must be a positive integer")
		);
	});

	test("should normalize empty orderType strings", async () => {
		mockService.updateTransaction.mockResolvedValue({ id: 3 });

		await usecase.execute(3, { orderType: "   " });

		expect(mockService.updateTransaction).toHaveBeenCalledWith({
			id: 3,
			data: { orderType: null }
		});
	});

	test("should handle nullable ids and tax", async () => {
		mockService.updateTransaction.mockResolvedValue({ id: 4 });

		await usecase.execute(4, { placeId: null, tableId: "6", tax: null });

		expect(mockService.updateTransaction).toHaveBeenLastCalledWith({
			id: 4,
			data: { placeId: null, tableId: 6, tax: null }
		});
	});
});
