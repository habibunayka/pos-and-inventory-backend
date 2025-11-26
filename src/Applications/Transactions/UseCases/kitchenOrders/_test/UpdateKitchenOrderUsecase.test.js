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
});
