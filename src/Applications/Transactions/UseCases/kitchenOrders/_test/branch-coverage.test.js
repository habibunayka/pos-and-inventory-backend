import { describe, expect, test, jest } from "@jest/globals";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import CreateKitchenOrderUsecase from "../CreateKitchenOrderUsecase.js";
import UpdateKitchenOrderUsecase from "../UpdateKitchenOrderUsecase.js";

describe("KitchenOrders usecase branch coverage", () => {
	test("CreateKitchenOrderUsecase default arg branch", async () => {
		const usecase = new CreateKitchenOrderUsecase({ kitchenOrderService: { createKitchenOrder: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	test("CreateKitchenOrderUsecase handles falsy startedAt and note null", async () => {
		const kitchenOrderService = { createKitchenOrder: jest.fn() };
		const usecase = new CreateKitchenOrderUsecase({ kitchenOrderService });

		await usecase.execute({
			transactionItemId: 1,
			startedAt: "",
			finishedAt: "2023-01-01T00:00:00.000Z",
			note: null
		});

		expect(kitchenOrderService.createKitchenOrder).toHaveBeenCalledWith({
			transactionItemId: 1,
			startedAt: null,
			finishedAt: expect.any(Date),
			note: null
		});
	});

	test("UpdateKitchenOrderUsecase covers defaults and status normalization", async () => {
		const kitchenOrderService = {
			updateKitchenOrder: jest.fn().mockResolvedValue({ id: 1, transactionItemId: 2 }),
			listKitchenOrdersByTransactionId: jest.fn().mockResolvedValue([])
		};
		const transactionItemService = { getItem: jest.fn().mockResolvedValue(null) };
		const transactionService = { updateTransaction: jest.fn() };
		const usecase = new UpdateKitchenOrderUsecase({
			kitchenOrderService,
			transactionItemService,
			transactionService
		});

		await usecase.execute(1);
		await usecase.execute(1, { status: null, note: null });

		expect(kitchenOrderService.updateKitchenOrder).toHaveBeenCalledWith({
			id: 1,
			data: { status: "queued", note: null }
		});
	});
});
