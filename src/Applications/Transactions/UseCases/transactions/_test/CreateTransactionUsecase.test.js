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

	test("should allow nullables and default orderType trimming", async () => {
		mockService.createTransaction.mockResolvedValue({ id: 20 });

		const result = await usecase.execute({
			cashierId: "1",
			orderType: "   ",
			total: "50",
			tax: null,
			discount: "5",
			paymentMethodId: null
		});

		expect(mockService.createTransaction).toHaveBeenCalledWith({
			cashierId: 1,
			orderType: null,
			total: 50,
			tax: null,
			discount: 5,
			paymentMethodId: null
		});
		expect(result).toEqual({ id: 20 });
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

	test("should allow optional fields to be omitted entirely", async () => {
		mockService.createTransaction.mockResolvedValue({});

		await usecase.execute({});

		expect(mockService.createTransaction).toHaveBeenCalledWith({});
	});

	test("should handle nullables and validate paymentMethodId", async () => {
		const created = { id: 11 };
		mockService.createTransaction.mockResolvedValue(created);

		const result = await usecase.execute({
			orderType: null,
			tax: undefined,
			discount: undefined,
			paymentMethodId: null
		});

		expect(mockService.createTransaction).toHaveBeenCalledWith({
			orderType: null,
			paymentMethodId: null
		});
		expect(result).toEqual(created);

		await expect(usecase.execute({ paymentMethodId: "abc" })).rejects.toThrow(
			new ValidationError("paymentMethodId must be a positive integer")
		);
	});
});
