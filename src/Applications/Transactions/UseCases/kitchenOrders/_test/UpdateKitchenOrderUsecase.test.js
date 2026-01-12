import { jest } from "@jest/globals";
import UpdateKitchenOrderUsecase from "../UpdateKitchenOrderUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("UpdateKitchenOrderUsecase", () => {
	let kitchenOrderService;
	let transactionItemService;
	let transactionService;
	let usecase;

	beforeEach(() => {
		kitchenOrderService = {
			updateKitchenOrder: jest.fn(),
			listKitchenOrdersByTransactionId: jest.fn()
		};
		transactionItemService = { getItem: jest.fn() };
		transactionService = { updateTransaction: jest.fn() };
		usecase = new UpdateKitchenOrderUsecase({
			kitchenOrderService,
			transactionItemService,
			transactionService
		});
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateKitchenOrderUsecase()).toThrow("UPDATE_KITCHEN_ORDER.MISSING_SERVICE");
	});

	test("should throw when transaction item service missing", () => {
		expect(() => new UpdateKitchenOrderUsecase({ kitchenOrderService })).toThrow(
			"UPDATE_KITCHEN_ORDER.MISSING_TRANSACTION_ITEM_SERVICE"
		);
	});

	test("should throw when transaction service missing", () => {
		expect(() =>
			new UpdateKitchenOrderUsecase({ kitchenOrderService, transactionItemService })
		).toThrow("UPDATE_KITCHEN_ORDER.MISSING_TRANSACTION_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should update kitchen order with normalized payload", async () => {
		const updated = { id: 2, status: "done", transactionItemId: 3 };
		kitchenOrderService.updateKitchenOrder.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			transactionItemId: "3",
			status: " done ",
			startedAt: "2023-01-01T00:00:00.000Z",
			finishedAt: "2023-01-02T00:00:00.000Z",
			note: "  note "
		});

		expect(kitchenOrderService.updateKitchenOrder).toHaveBeenCalledWith({
			id: 2,
			data: {
				transactionItemId: 3,
				status: "done",
				startedAt: expect.any(Date),
				finishedAt: expect.any(Date),
				note: "note"
			}
		});
		expect(result).toEqual(updated);
	});

	test("should allow nullables and fallback status when empty", async () => {
		kitchenOrderService.updateKitchenOrder.mockResolvedValue({ id: 5 });

		const result = await usecase.execute(5, {
			status: "   ",
			startedAt: null,
			finishedAt: undefined,
			note: null
		});

		expect(kitchenOrderService.updateKitchenOrder).toHaveBeenCalledWith({
			id: 5,
			data: { status: "queued", startedAt: null, note: null }
		});
		expect(result).toEqual({ id: 5 });
	});

	test("should skip optional fields when not provided and handle nullables", async () => {
		kitchenOrderService.updateKitchenOrder.mockResolvedValue({ id: 6 });

		await usecase.execute(6, {
			status: null,
			finishedAt: null
		});

		expect(kitchenOrderService.updateKitchenOrder).toHaveBeenCalledWith({
			id: 6,
			data: { status: "queued", finishedAt: null }
		});
	});

	test("should update transaction when all kitchen orders done", async () => {
		kitchenOrderService.updateKitchenOrder.mockResolvedValue({ id: 1, status: "done", transactionItemId: 11 });
		transactionItemService.getItem.mockResolvedValue({ id: 11, transactionId: 22 });
		kitchenOrderService.listKitchenOrdersByTransactionId.mockResolvedValue([
			{ id: 1, status: "done" },
			{ id: 2, status: "done" }
		]);

		await usecase.execute(1, { status: "done" });

		expect(transactionService.updateTransaction).toHaveBeenCalledWith({
			id: 22,
			data: { status: "ready_to_pickup" }
		});
	});

	test("should not update transaction when any kitchen order not done", async () => {
		kitchenOrderService.updateKitchenOrder.mockResolvedValue({ id: 1, status: "done", transactionItemId: 11 });
		transactionItemService.getItem.mockResolvedValue({ id: 11, transactionId: 22 });
		kitchenOrderService.listKitchenOrdersByTransactionId.mockResolvedValue([
			{ id: 1, status: "done" },
			{ id: 2, status: "queued" }
		]);

		await usecase.execute(1, { status: "done" });

		expect(transactionService.updateTransaction).not.toHaveBeenCalled();
	});

	test("should skip transaction update when status is not done", async () => {
		kitchenOrderService.updateKitchenOrder.mockResolvedValue({ id: 1, status: "proses", transactionItemId: 11 });

		await usecase.execute(1, { status: "proses" });

		expect(transactionService.updateTransaction).not.toHaveBeenCalled();
	});

	test("should validate transactionItemId when provided", async () => {
		await expect(usecase.execute(1, { transactionItemId: "bad" })).rejects.toThrow(
			new ValidationError("transactionItemId must be a positive integer")
		);
	});
});
