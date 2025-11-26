import { jest } from "@jest/globals";
import CreateKitchenOrderUsecase from "../CreateKitchenOrderUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CreateKitchenOrderUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { createKitchenOrder: jest.fn() };
		usecase = new CreateKitchenOrderUsecase({ kitchenOrderService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateKitchenOrderUsecase()).toThrow("CREATE_KITCHEN_ORDER.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when transactionItemId invalid", async () => {
		await expect(usecase.execute({ transactionItemId: "abc" })).rejects.toThrow(
			new ValidationError("transactionItemId must be a positive integer")
		);
	});

	test("should create kitchen order with normalized payload", async () => {
		const created = { id: 5 };
		mockService.createKitchenOrder.mockResolvedValue(created);

		const result = await usecase.execute({
			transactionItemId: "10",
			status: " cooking ",
			startedAt: "2023-01-01T00:00:00.000Z",
			finishedAt: null,
			note: "  extra spicy "
		});

		expect(mockService.createKitchenOrder).toHaveBeenCalledWith({
			transactionItemId: 10,
			status: "cooking",
			startedAt: expect.any(Date),
			finishedAt: null,
			note: "extra spicy"
		});
		expect(result).toEqual(created);
	});
});
