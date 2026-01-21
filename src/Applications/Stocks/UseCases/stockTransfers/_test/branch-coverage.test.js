import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import CreateStockTransferUsecase from "../CreateStockTransferUsecase.js";
import UpdateStockTransferUsecase from "../UpdateStockTransferUsecase.js";

describe("Stock transfer usecase branch coverage", () => {
	it("CreateStockTransferUsecase handles default payload and notes", async () => {
		const stockTransferService = { createStockTransfer: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateStockTransferUsecase({ stockTransferService });
		await usecase.execute();
		await usecase.execute({ note: null });
		expect(stockTransferService.createStockTransfer).toHaveBeenCalledWith({ note: null });
	});

	it("UpdateStockTransferUsecase handles default payload and note", async () => {
		const stockTransferService = { updateStockTransfer: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new UpdateStockTransferUsecase({ stockTransferService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);

		await usecase.execute(1, { note: null });
		expect(stockTransferService.updateStockTransfer).toHaveBeenCalledWith({
			id: 1,
			data: { note: null }
		});
	});
});
