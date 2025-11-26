import { jest } from "@jest/globals";
import TransactionItemVariantService from "../TransactionItemVariantService.js";

describe("TransactionItemVariantService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createVariant: jest.fn(),
			deleteVariant: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new TransactionItemVariantService()).toThrow(
			"TRANSACTION_ITEM_VARIANT_SERVICE.MISSING_REPOSITORY"
		);
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new TransactionItemVariantService({ transactionItemVariantRepository: badRepo })).toThrow(
			"TRANSACTION_ITEM_VARIANT_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listVariants should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new TransactionItemVariantService({ transactionItemVariantRepository: mockRepo });

		const result = service.listVariants();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getVariant should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new TransactionItemVariantService({ transactionItemVariantRepository: mockRepo });

		const result = service.getVariant(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createVariant should delegate to repository", async () => {
		mockRepo.createVariant.mockResolvedValue({ id: 3 });
		const service = new TransactionItemVariantService({ transactionItemVariantRepository: mockRepo });

		const result = service.createVariant({ foo: "bar" });

		expect(mockRepo.createVariant).toHaveBeenCalledWith({ foo: "bar" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("deleteVariant should delegate to repository", async () => {
		mockRepo.deleteVariant.mockResolvedValue(true);
		const service = new TransactionItemVariantService({ transactionItemVariantRepository: mockRepo });

		const result = service.deleteVariant(5);

		expect(mockRepo.deleteVariant).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
