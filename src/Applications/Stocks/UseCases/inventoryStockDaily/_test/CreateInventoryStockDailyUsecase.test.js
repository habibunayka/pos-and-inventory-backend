import { jest } from "@jest/globals";
import CreateInventoryStockDailyUsecase from "../CreateInventoryStockDailyUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CreateInventoryStockDailyUsecase", () => {
	let inventoryStockDailyService;
	let usecase;

	beforeEach(() => {
		inventoryStockDailyService = { create: jest.fn() };
		usecase = new CreateInventoryStockDailyUsecase({ inventoryStockDailyService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateInventoryStockDailyUsecase()).toThrow("CREATE_ISD.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should create inventory stock daily with normalized payload", async () => {
		const created = { id: 1 };
		inventoryStockDailyService.create.mockResolvedValue(created);

		const result = await usecase.execute({
			placeId: "1",
			ingredientId: "2",
			date: "2023-01-01T00:00:00.000Z",
			openingQty: "10",
			closingQty: "5",
			diffQty: null
		});

		expect(inventoryStockDailyService.create).toHaveBeenCalledWith({
			placeId: 1,
			ingredientId: 2,
			date: expect.any(Date),
			openingQty: 10,
			closingQty: 5,
			diffQty: null
		});
		expect(result).toEqual(created);
	});
});
