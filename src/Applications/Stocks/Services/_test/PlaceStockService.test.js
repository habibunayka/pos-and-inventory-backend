import { jest } from "@jest/globals";
import PlaceStockService from "../PlaceStockService.js";

describe("PlaceStockService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createPlaceStock: jest.fn(),
			updatePlaceStock: jest.fn(),
			deletePlaceStock: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new PlaceStockService()).toThrow("PLACESTOCK_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new PlaceStockService({ placeStockRepository: badRepo })).toThrow(
			"PLACESTOCK_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listPlaceStocks should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new PlaceStockService({ placeStockRepository: mockRepo });

		const result = service.listPlaceStocks();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getPlaceStock should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new PlaceStockService({ placeStockRepository: mockRepo });

		const result = service.getPlaceStock(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createPlaceStock should delegate to repository", async () => {
		mockRepo.createPlaceStock.mockResolvedValue({ id: 3 });
		const service = new PlaceStockService({ placeStockRepository: mockRepo });

		const result = service.createPlaceStock({ foo: "bar" });

		expect(mockRepo.createPlaceStock).toHaveBeenCalledWith({ foo: "bar" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updatePlaceStock should delegate to repository", async () => {
		mockRepo.updatePlaceStock.mockResolvedValue({ id: 4 });
		const service = new PlaceStockService({ placeStockRepository: mockRepo });

		const result = service.updatePlaceStock({ id: 4, data: { qty: 10 } });

		expect(mockRepo.updatePlaceStock).toHaveBeenCalledWith({ id: 4, data: { qty: 10 } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deletePlaceStock should delegate to repository", async () => {
		mockRepo.deletePlaceStock.mockResolvedValue(true);
		const service = new PlaceStockService({ placeStockRepository: mockRepo });

		const result = service.deletePlaceStock(5);

		expect(mockRepo.deletePlaceStock).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
