import { jest } from "@jest/globals";
import ListKitchenOrdersUsecase from "../ListKitchenOrdersUsecase.js";

describe("ListKitchenOrdersUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { listKitchenOrders: jest.fn() };
		usecase = new ListKitchenOrdersUsecase({ kitchenOrderService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListKitchenOrdersUsecase()).toThrow("LIST_KITCHEN_ORDERS.MISSING_SERVICE");
	});

	test("should list kitchen orders", async () => {
		const records = [{ id: 1 }];
		mockService.listKitchenOrders.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(mockService.listKitchenOrders).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
