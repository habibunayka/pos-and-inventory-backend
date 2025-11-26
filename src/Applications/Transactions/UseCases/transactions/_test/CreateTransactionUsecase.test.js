import { jest } from "@jest/globals";
import CreateTransactionUsecase from "../CreateTransactionUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CreateTransactionUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			createTransaction: jest.fn()
		};
		usecase = new CreateTransactionUsecase({ transactionService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateTransactionUsecase()).toThrow("CREATE_TRANSACTION.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when cashierId invalid", async () => {
		await expect(usecase.execute({ cashierId: "abc" })).rejects.toThrow(
			new ValidationError("cashierId must be a positive integer")
		);
	});

	test("should create transaction with normalized payload", async () => {
		const payload = {
			cashierId: "1",
			placeId: "2",
			tableId: "3",
			orderType: " dine-in ",
			total: "100",
			tax: "10",
			discount: null,
			paymentMethodId: "4"
		};
		const created = { id: 10, total: 100 };
		mockService.createTransaction.mockResolvedValue(created);

		const result = await usecase.execute(payload);

		expect(mockService.createTransaction).toHaveBeenCalledWith({
			cashierId: 1,
			placeId: 2,
			tableId: 3,
			orderType: "dine-in",
			total: 100,
			tax: 10,
			discount: null,
			paymentMethodId: 4
		});
		expect(result).toEqual(created);
	});
});
