import { jest } from "@jest/globals";
import TransactionService from "../TransactionService.js";

describe("TransactionService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createTransaction: jest.fn(),
			updateTransaction: jest.fn(),
			deleteTransaction: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new TransactionService()).toThrow("TRANSACTION_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new TransactionService({ transactionRepository: badRepo })).toThrow(
			"TRANSACTION_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("should store repository when valid", () => {
		const service = new TransactionService({ transactionRepository: mockRepo });

		expect(service._repo).toBe(mockRepo);
	});

	test("listTransactions should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new TransactionService({ transactionRepository: mockRepo });

		const result = service.listTransactions();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getTransaction should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new TransactionService({ transactionRepository: mockRepo });

		const result = service.getTransaction(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createTransaction should delegate to repository", async () => {
		mockRepo.createTransaction.mockResolvedValue({ id: 3, total: 100 });
		const service = new TransactionService({ transactionRepository: mockRepo });

		const result = service.createTransaction({ total: 100 });

		expect(mockRepo.createTransaction).toHaveBeenCalledWith({ total: 100 });
		await expect(result).resolves.toEqual({ id: 3, total: 100 });
	});

	test("updateTransaction should delegate to repository", async () => {
		mockRepo.updateTransaction.mockResolvedValue({ id: 4, total: 200 });
		const service = new TransactionService({ transactionRepository: mockRepo });

		const result = service.updateTransaction({ id: 4, data: { total: 200 } });

		expect(mockRepo.updateTransaction).toHaveBeenCalledWith({ id: 4, data: { total: 200 } });
		await expect(result).resolves.toEqual({ id: 4, total: 200 });
	});

	test("deleteTransaction should delegate to repository", async () => {
		mockRepo.deleteTransaction.mockResolvedValue(true);
		const service = new TransactionService({ transactionRepository: mockRepo });

		const result = service.deleteTransaction(5);

		expect(mockRepo.deleteTransaction).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
