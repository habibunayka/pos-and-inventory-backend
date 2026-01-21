import { describe, expect, test, jest } from "@jest/globals";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import UpdateTransactionItemUsecase from "../UpdateTransactionItemUsecase.js";

describe("TransactionItems usecase branch coverage", () => {
	test("UpdateTransactionItemUsecase handles missing payload", async () => {
		const service = { updateTransactionItem: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new UpdateTransactionItemUsecase({ transactionItemService: service });
		await expect(usecase.execute(1, null)).rejects.toThrow(ValidationError);
	});

	test("UpdateTransactionItemUsecase default payload and discount omission", async () => {
		const service = { updateItem: jest.fn() };
		const usecase = new UpdateTransactionItemUsecase({ transactionItemService: service });

		await usecase.execute(1);
		expect(service.updateItem).toHaveBeenCalledWith({ id: 1, data: {} });
	});
});
