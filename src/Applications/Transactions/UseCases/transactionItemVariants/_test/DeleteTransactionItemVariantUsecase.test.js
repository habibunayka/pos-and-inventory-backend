import { jest } from "@jest/globals";
import DeleteTransactionItemVariantUsecase from "../DeleteTransactionItemVariantUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("DeleteTransactionItemVariantUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { deleteVariant: jest.fn() };
		usecase = new DeleteTransactionItemVariantUsecase({ transactionItemVariantService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteTransactionItemVariantUsecase()).toThrow(
			"DELETE_TRANSACTION_ITEM_VARIANT.MISSING_SERVICE"
		);
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		mockService.deleteVariant.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Transaction item variant not found"));
	});

	test("should delete variant", async () => {
		mockService.deleteVariant.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(mockService.deleteVariant).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
