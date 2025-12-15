import { jest } from "@jest/globals";
import UpdateKitchenOrderUsecase from "../UpdateKitchenOrderUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("UpdateKitchenOrderUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { updateKitchenOrder: jest.fn() };
		usecase = new UpdateKitchenOrderUsecase({ kitchenOrderService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateKitchenOrderUsecase()).toThrow("UPDATE_KITCHEN_ORDER.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should update kitchen order with normalized payload", async () => {
		const updated = { id: 2, status: "done" };
		mockService.updateKitchenOrder.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			transactionItemId: "3",
			status: " done ",
			startedAt: "2023-01-01T00:00:00.000Z",
			finishedAt: "2023-01-02T00:00:00.000Z",
			note: "  note "
		});

		expect(mockService.updateKitchenOrder).toHaveBeenCalledWith({
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
		mockService.updateKitchenOrder.mockResolvedValue({ id: 5 });

		const result = await usecase.execute(5, {
			status: "   ",
			startedAt: null,
			finishedAt: undefined,
			note: null
		});

		expect(mockService.updateKitchenOrder).toHaveBeenCalledWith({
			id: 5,
			data: { status: "waiting", startedAt: null, note: null }
		});
		expect(result).toEqual({ id: 5 });
	});

	test("should skip optional fields when not provided and handle nullables", async () => {
		mockService.updateKitchenOrder.mockResolvedValue({ id: 6 });

		await usecase.execute(6, {
			status: null,
			finishedAt: null
		});

		expect(mockService.updateKitchenOrder).toHaveBeenCalledWith({
			id: 6,
			data: { status: null, finishedAt: null }
		});
	});

	test("should validate transactionItemId when provided", async () => {
		await expect(usecase.execute(1, { transactionItemId: "bad" })).rejects.toThrow(
			new ValidationError("transactionItemId must be a positive integer")
		);
	});
});
