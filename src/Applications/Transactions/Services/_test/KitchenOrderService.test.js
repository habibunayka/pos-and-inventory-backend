import { jest } from "@jest/globals";
import KitchenOrderService from "../KitchenOrderService.js";

describe("KitchenOrderService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createKitchenOrder: jest.fn(),
			updateKitchenOrder: jest.fn(),
			deleteKitchenOrder: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new KitchenOrderService()).toThrow("KITCHEN_ORDER_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new KitchenOrderService({ kitchenOrderRepository: badRepo })).toThrow(
			"KITCHEN_ORDER_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listKitchenOrders should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new KitchenOrderService({ kitchenOrderRepository: mockRepo });

		const result = service.listKitchenOrders();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getKitchenOrder should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new KitchenOrderService({ kitchenOrderRepository: mockRepo });

		const result = service.getKitchenOrder(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createKitchenOrder should delegate to repository", async () => {
		mockRepo.createKitchenOrder.mockResolvedValue({ id: 3 });
		const service = new KitchenOrderService({ kitchenOrderRepository: mockRepo });

		const result = service.createKitchenOrder({ foo: "bar" });

		expect(mockRepo.createKitchenOrder).toHaveBeenCalledWith({ foo: "bar" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateKitchenOrder should delegate to repository", async () => {
		mockRepo.updateKitchenOrder.mockResolvedValue({ id: 4 });
		const service = new KitchenOrderService({ kitchenOrderRepository: mockRepo });

		const result = service.updateKitchenOrder({ id: 4, data: { status: "proses" } });

		expect(mockRepo.updateKitchenOrder).toHaveBeenCalledWith({ id: 4, data: { status: "proses" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteKitchenOrder should delegate to repository", async () => {
		mockRepo.deleteKitchenOrder.mockResolvedValue(true);
		const service = new KitchenOrderService({ kitchenOrderRepository: mockRepo });

		const result = service.deleteKitchenOrder(5);

		expect(mockRepo.deleteKitchenOrder).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
