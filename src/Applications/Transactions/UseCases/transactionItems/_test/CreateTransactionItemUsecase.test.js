import { jest } from "@jest/globals";
import CreateTransactionItemUsecase from "../CreateTransactionItemUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CreateTransactionItemUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { createItem: jest.fn() };
		usecase = new CreateTransactionItemUsecase({ transactionItemService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateTransactionItemUsecase()).toThrow("CREATE_TRANSACTION_ITEM.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when required ids invalid", async () => {
		await expect(usecase.execute({ transactionId: "abc", menuId: 1, qty: 1, price: 10 })).rejects.toThrow(
			new ValidationError("transactionId must be a positive integer")
		);
	});

	test("should allow nullable discount", async () => {
		mockService.createItem.mockResolvedValue({ id: 8 });

		const result = await usecase.execute({
			transactionId: 1,
			menuId: 2,
			qty: 3,
			price: 100,
			discount: null
		});

		expect(mockService.createItem).toHaveBeenCalledWith({
			transactionId: 1,
			menuId: 2,
			qty: 3,
			price: 100,
			discount: null
		});
		expect(result).toEqual({ id: 8 });
	});

	test("should create transaction item with normalized payload", async () => {
		const created = { id: 5 };
		mockService.createItem.mockResolvedValue(created);

		const result = await usecase.execute({
			transactionId: "1",
			menuId: "2",
			qty: "3",
			price: "100",
			discount: null
		});

		expect(mockService.createItem).toHaveBeenCalledWith({
			transactionId: 1,
			menuId: 2,
			qty: 3,
			price: 100,
			discount: null
		});
		expect(result).toEqual(created);
	});

	test("should support payload without discount and with numeric discount", async () => {
		mockService.createItem.mockResolvedValue({});

		await usecase.execute({ transactionId: 1, menuId: 2, qty: 1, price: 10 });
		expect(mockService.createItem).toHaveBeenLastCalledWith({ transactionId: 1, menuId: 2, qty: 1, price: 10 });

		await usecase.execute({ transactionId: 1, menuId: 2, qty: 1, price: 10, discount: 5 });
		expect(mockService.createItem).toHaveBeenLastCalledWith({
			transactionId: 1,
			menuId: 2,
			qty: 1,
			price: 10,
			discount: 5
		});
	});

	test("should cover default payload branch", async () => {
		await expect(usecase.execute()).rejects.toThrow(
			new ValidationError("transactionId must be a positive integer")
		);
	});
});
