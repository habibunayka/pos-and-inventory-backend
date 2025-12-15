import { jest } from "@jest/globals";
import ListTransactionItemsUsecase from "../ListTransactionItemsUsecase.js";

describe("ListTransactionItemsUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { listItems: jest.fn() };
		usecase = new ListTransactionItemsUsecase({ transactionItemService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListTransactionItemsUsecase()).toThrow("LIST_TRANSACTION_ITEMS.MISSING_SERVICE");
	});

	test("should list transaction items", async () => {
		const records = [{ id: 1 }];
		mockService.listItems.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(mockService.listItems).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
