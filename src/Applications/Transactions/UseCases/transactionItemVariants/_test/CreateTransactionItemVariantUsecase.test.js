import { jest } from "@jest/globals";
import CreateTransactionItemVariantUsecase from "../CreateTransactionItemVariantUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CreateTransactionItemVariantUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { createVariant: jest.fn() };
		usecase = new CreateTransactionItemVariantUsecase({ transactionItemVariantService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateTransactionItemVariantUsecase()).toThrow(
			"CREATE_TRANSACTION_ITEM_VARIANT.MISSING_SERVICE"
		);
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when ids invalid", async () => {
		await expect(usecase.execute({ transactionItemId: "abc", menuVariantId: 1 })).rejects.toThrow(
			new ValidationError("transactionItemId must be a positive integer")
		);
	});

	test("should create variant with normalized payload", async () => {
		const created = { id: 5 };
		mockService.createVariant.mockResolvedValue(created);

		const result = await usecase.execute({
			transactionItemId: "1",
			menuVariantId: "2",
			extraPrice: "10"
		});

		expect(mockService.createVariant).toHaveBeenCalledWith({
			transactionItemId: 1,
			menuVariantId: 2,
			extraPrice: 10
		});
		expect(result).toEqual(created);
	});
});
