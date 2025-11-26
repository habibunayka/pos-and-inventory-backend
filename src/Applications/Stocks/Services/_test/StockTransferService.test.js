import { jest } from "@jest/globals";
import StockTransferService from "../StockTransferService.js";

describe("StockTransferService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createTransfer: jest.fn(),
			deleteTransfer: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new StockTransferService()).toThrow("STOCK_TRANSFER_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new StockTransferService({ stockTransferRepository: badRepo })).toThrow(
			"STOCK_TRANSFER_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("list should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new StockTransferService({ stockTransferRepository: mockRepo });

		const result = service.list();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("get should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new StockTransferService({ stockTransferRepository: mockRepo });

		const result = service.get(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("create should delegate to repository", async () => {
		mockRepo.createTransfer.mockResolvedValue({ id: 3 });
		const service = new StockTransferService({ stockTransferRepository: mockRepo });

		const result = service.create({ foo: "bar" });

		expect(mockRepo.createTransfer).toHaveBeenCalledWith({ foo: "bar" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("delete should delegate to repository", async () => {
		mockRepo.deleteTransfer.mockResolvedValue(true);
		const service = new StockTransferService({ stockTransferRepository: mockRepo });

		const result = service.delete(4);

		expect(mockRepo.deleteTransfer).toHaveBeenCalledWith(4);
		await expect(result).resolves.toBe(true);
	});
});
