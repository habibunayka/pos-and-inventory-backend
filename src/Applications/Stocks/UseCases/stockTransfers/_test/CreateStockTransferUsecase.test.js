import { jest } from "@jest/globals";
import CreateStockTransferUsecase from "../CreateStockTransferUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CreateStockTransferUsecase", () => {
	let stockTransferService;
	let usecase;

	beforeEach(() => {
		stockTransferService = { createStockTransfer: jest.fn() };
		usecase = new CreateStockTransferUsecase({ stockTransferService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateStockTransferUsecase()).toThrow("CREATE_STOCK_TRANSFER.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when ids invalid", async () => {
		await expect(usecase.execute({ fromPlaceId: "abc", toPlaceId: 1 })).rejects.toThrow(
			new ValidationError("fromPlaceId must be a positive integer")
		);
	});

	test("should create stock transfer with normalized payload", async () => {
		const created = { id: 1 };
		stockTransferService.createStockTransfer.mockResolvedValue(created);

		const result = await usecase.execute({
			fromPlaceId: "1",
			toPlaceId: "2",
			ingredientId: "3",
			qty: "10",
			unitId: "4",
			note: "  note "
		});

		expect(stockTransferService.createStockTransfer).toHaveBeenCalledWith({
			fromPlaceId: 1,
			toPlaceId: 2,
			ingredientId: 3,
			qty: 10,
			unitId: 4,
			note: "note"
		});
		expect(result).toEqual(created);
	});

	test("should allow optional fields to be skipped and normalize empty note", async () => {
		stockTransferService.createStockTransfer.mockResolvedValue({});

		await usecase.execute({ note: "   " });

		expect(stockTransferService.createStockTransfer).toHaveBeenCalledWith({ note: null });
	});

	test("should validate qty separately from ids", async () => {
		await expect(usecase.execute({ qty: 0 })).rejects.toThrow(new ValidationError("qty must be a number"));
		await expect(usecase.execute({ qty: "abc" })).rejects.toThrow(new ValidationError("qty must be a number"));
	});
});
