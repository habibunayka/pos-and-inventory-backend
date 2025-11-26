import { jest } from "@jest/globals";
import GetTransactionItemVariantUsecase from "../GetTransactionItemVariantUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("GetTransactionItemVariantUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { getVariant: jest.fn() };
		usecase = new GetTransactionItemVariantUsecase({ transactionItemVariantService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetTransactionItemVariantUsecase()).toThrow("GET_TRANSACTION_ITEM_VARIANT.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when variant not found", async () => {
		mockService.getVariant.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(
			new ValidationError("Transaction item variant not found")
		);
	});

	test("should return variant when found", async () => {
		mockService.getVariant.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(mockService.getVariant).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
