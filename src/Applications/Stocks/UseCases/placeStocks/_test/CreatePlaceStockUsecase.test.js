import { jest } from "@jest/globals";
import CreatePlaceStockUsecase from "../CreatePlaceStockUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CreatePlaceStockUsecase", () => {
	let placeStockService;
	let usecase;

	beforeEach(() => {
		placeStockService = { createPlaceStock: jest.fn() };
		usecase = new CreatePlaceStockUsecase({ placeStockService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreatePlaceStockUsecase()).toThrow("CREATE_PLACESTOCK.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should create place stock with normalized numbers", async () => {
		const created = { id: 5 };
		placeStockService.createPlaceStock.mockResolvedValue(created);

		const result = await usecase.execute({
			placeId: "1",
			ingredientId: "2",
			qty: "3",
			unitId: "4"
		});

		expect(placeStockService.createPlaceStock).toHaveBeenCalledWith({
			placeId: 1,
			ingredientId: 2,
			qty: 3,
			unitId: 4
		});
		expect(result).toEqual(created);
	});
});
