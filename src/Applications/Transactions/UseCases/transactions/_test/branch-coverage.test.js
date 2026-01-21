import { describe, expect, it, jest } from "@jest/globals";
import CreateTransactionUsecase from "../CreateTransactionUsecase.js";
import UpdateTransactionUsecase from "../UpdateTransactionUsecase.js";

describe("Transactions usecase branch coverage", () => {
	it("CreateTransactionUsecase handles defaults and nullish ids", async () => {
		const transactionService = { createTransaction: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new CreateTransactionUsecase({ transactionService });
		await usecase.execute();
		expect(transactionService.createTransaction).toHaveBeenCalledWith({ status: "proses" });

		await usecase.execute({ placeId: 0, tableId: 0 });
		expect(transactionService.createTransaction).toHaveBeenLastCalledWith({
			status: "proses",
			placeId: null,
			tableId: null
		});
	});

	it("UpdateTransactionUsecase handles defaults and null fields", async () => {
		const transactionService = { updateTransaction: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new UpdateTransactionUsecase({ transactionService });
		await usecase.execute(1);

		await usecase.execute(1, { customerName: null, note: null, status: null, discount: null });
		expect(transactionService.updateTransaction).toHaveBeenLastCalledWith({
			id: 1,
			data: { customerName: null, note: null, status: null, discount: null }
		});
	});
});
