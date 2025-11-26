import { jest } from "@jest/globals";
import UpdateTransactionItemUsecase from "../UpdateTransactionItemUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("UpdateTransactionItemUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = { updateItem: jest.fn() };
		usecase = new UpdateTransactionItemUsecase({ transactionItemService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateTransactionItemUsecase()).toThrow("UPDATE_TRANSACTION_ITEM.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should update transaction item with normalized payload", async () => {
		const updated = { id: 2 };
		mockService.updateItem.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			transactionId: "3",
			menuId: "4",
			qty: "5",
			price: "100",
			discount: null
		});

		expect(mockService.updateItem).toHaveBeenCalledWith({
			id: 2,
			data: {
				transactionId: 3,
				menuId: 4,
				qty: 5,
				price: 100,
				discount: null
			}
		});
		expect(result).toEqual(updated);
	});
});
