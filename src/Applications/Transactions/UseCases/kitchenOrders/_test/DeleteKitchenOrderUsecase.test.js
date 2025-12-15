import { jest } from "@jest/globals";
import DeleteKitchenOrderUsecase from "../DeleteKitchenOrderUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("DeleteKitchenOrderUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { deleteKitchenOrder: jest.fn() };
		usecase = new DeleteKitchenOrderUsecase({ kitchenOrderService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteKitchenOrderUsecase()).toThrow("DELETE_KITCHEN_ORDER.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		mockService.deleteKitchenOrder.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Kitchen order not found"));
	});

	test("should delete kitchen order", async () => {
		mockService.deleteKitchenOrder.mockResolvedValue(true);

		const result = await usecase.execute("3");

		expect(mockService.deleteKitchenOrder).toHaveBeenCalledWith(3);
		expect(result).toBe(true);
	});
});
