import { jest } from "@jest/globals";
import TransactionItemService from "../TransactionItemService.js";

describe("TransactionItemService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createItem: jest.fn(),
			updateItem: jest.fn(),
			deleteItem: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new TransactionItemService()).toThrow("TRANSACTION_ITEM_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new TransactionItemService({ transactionItemRepository: badRepo })).toThrow(
			"TRANSACTION_ITEM_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listItems should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new TransactionItemService({ transactionItemRepository: mockRepo });

		const result = service.listItems();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getItem should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new TransactionItemService({ transactionItemRepository: mockRepo });

		const result = service.getItem(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createItem should delegate to repository", async () => {
		mockRepo.createItem.mockResolvedValue({ id: 3 });
		const service = new TransactionItemService({ transactionItemRepository: mockRepo });

		const result = service.createItem({ foo: "bar" });

		expect(mockRepo.createItem).toHaveBeenCalledWith({ foo: "bar" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateItem should delegate to repository", async () => {
		mockRepo.updateItem.mockResolvedValue({ id: 4 });
		const service = new TransactionItemService({ transactionItemRepository: mockRepo });

		const result = service.updateItem({ id: 4, data: { qty: 2 } });

		expect(mockRepo.updateItem).toHaveBeenCalledWith({ id: 4, data: { qty: 2 } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteItem should delegate to repository", async () => {
		mockRepo.deleteItem.mockResolvedValue(true);
		const service = new TransactionItemService({ transactionItemRepository: mockRepo });

		const result = service.deleteItem(5);

		expect(mockRepo.deleteItem).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
