import { jest } from "@jest/globals";
import ListTransactionItemVariantsUsecase from "../ListTransactionItemVariantsUsecase.js";

describe("ListTransactionItemVariantsUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { listVariants: jest.fn() };
		usecase = new ListTransactionItemVariantsUsecase({ transactionItemVariantService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListTransactionItemVariantsUsecase()).toThrow("LIST_TRANSACTION_ITEM_VARIANTS.MISSING_SERVICE");
	});

	test("should list transaction item variants", async () => {
		const records = [{ id: 1 }];
		mockService.listVariants.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(mockService.listVariants).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
