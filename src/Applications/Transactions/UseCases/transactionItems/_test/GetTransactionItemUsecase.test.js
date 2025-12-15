import { jest } from "@jest/globals";
import GetTransactionItemUsecase from "../GetTransactionItemUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../../Commons/Errors/AppError.js";

describe("GetTransactionItemUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { getItem: jest.fn() };
		usecase = new GetTransactionItemUsecase({ transactionItemService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetTransactionItemUsecase()).toThrow("GET_TRANSACTION_ITEM.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when item not found", async () => {
		mockService.getItem.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should return item when found", async () => {
		mockService.getItem.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(mockService.getItem).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
