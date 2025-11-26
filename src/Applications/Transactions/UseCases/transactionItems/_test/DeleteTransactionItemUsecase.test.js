import { jest } from "@jest/globals";
import DeleteTransactionItemUsecase from "../DeleteTransactionItemUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("DeleteTransactionItemUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { deleteItem: jest.fn() };
		usecase = new DeleteTransactionItemUsecase({ transactionItemService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteTransactionItemUsecase()).toThrow("DELETE_TRANSACTION_ITEM.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		mockService.deleteItem.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Transaction item not found"));
	});

	test("should delete transaction item", async () => {
		mockService.deleteItem.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(mockService.deleteItem).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
