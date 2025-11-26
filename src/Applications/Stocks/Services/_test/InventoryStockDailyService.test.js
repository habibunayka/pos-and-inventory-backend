import { jest } from "@jest/globals";
import InventoryStockDailyService from "../InventoryStockDailyService.js";

describe("InventoryStockDailyService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createRecord: jest.fn(),
			updateRecord: jest.fn(),
			deleteRecord: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new InventoryStockDailyService()).toThrow("INVENTORY_STOCK_DAILY_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new InventoryStockDailyService({ inventoryStockDailyRepository: badRepo })).toThrow(
			"INVENTORY_STOCK_DAILY_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("list should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new InventoryStockDailyService({ inventoryStockDailyRepository: mockRepo });

		const result = service.list();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("get should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new InventoryStockDailyService({ inventoryStockDailyRepository: mockRepo });

		const result = service.get(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("create should delegate to repository", async () => {
		mockRepo.createRecord.mockResolvedValue({ id: 3 });
		const service = new InventoryStockDailyService({ inventoryStockDailyRepository: mockRepo });

		const result = service.create({ foo: "bar" });

		expect(mockRepo.createRecord).toHaveBeenCalledWith({ foo: "bar" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("update should delegate to repository", async () => {
		mockRepo.updateRecord.mockResolvedValue({ id: 4 });
		const service = new InventoryStockDailyService({ inventoryStockDailyRepository: mockRepo });

		const result = service.update({ id: 4, data: { qty: 10 } });

		expect(mockRepo.updateRecord).toHaveBeenCalledWith({ id: 4, data: { qty: 10 } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("delete should delegate to repository", async () => {
		mockRepo.deleteRecord.mockResolvedValue(true);
		const service = new InventoryStockDailyService({ inventoryStockDailyRepository: mockRepo });

		const result = service.delete(5);

		expect(mockRepo.deleteRecord).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
