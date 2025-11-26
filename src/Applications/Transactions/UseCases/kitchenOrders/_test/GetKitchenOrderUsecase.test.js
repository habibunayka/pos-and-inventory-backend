import { jest } from "@jest/globals";
import GetKitchenOrderUsecase from "../GetKitchenOrderUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../../Commons/Errors/AppError.js";

describe("GetKitchenOrderUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { getKitchenOrder: jest.fn() };
		usecase = new GetKitchenOrderUsecase({ kitchenOrderService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetKitchenOrderUsecase()).toThrow("GET_KITCHEN_ORDER.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when kitchen order not found", async () => {
		mockService.getKitchenOrder.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should return kitchen order when found", async () => {
		mockService.getKitchenOrder.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(mockService.getKitchenOrder).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
