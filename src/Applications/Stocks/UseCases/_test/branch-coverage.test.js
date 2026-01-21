import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateCashierShiftUsecase from "../cashierShifts/CreateCashierShiftUsecase.js";
import OpenCashierShiftUsecase from "../cashierShifts/OpenCashierShiftUsecase.js";
import CreateInventoryStockDailyUsecase from "../inventoryStockDaily/CreateInventoryStockDailyUsecase.js";
import CreatePlaceStockUsecase from "../placeStocks/CreatePlaceStockUsecase.js";

describe("Stocks usecase branch coverage", () => {
	it("OpenCashierShiftUsecase uses default payload validation", async () => {
		const usecase = new OpenCashierShiftUsecase({ cashierShiftService: { create: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateCashierShiftUsecase default arg branch", async () => {
		const usecase = new CreateCashierShiftUsecase({ cashierShiftService: { create: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateCashierShiftUsecase nullish ip/status handling", async () => {
		const cashierShiftService = { create: jest.fn() };
		const usecase = new CreateCashierShiftUsecase({
			cashierShiftService,
			placeService: { supportsPlaceValidation: false },
			stationService: null,
			shiftService: null
		});

		await expect(usecase.execute({ placeId: 1, stationId: 2, shiftId: 3, cashierId: 4 })).rejects.toThrow(
			new ValidationError("ipAddress is required")
		);

		await expect(
			usecase.execute({ placeId: 1, stationId: 2, shiftId: 3, cashierId: 4, ipAddress: "1.1.1.1", status: null })
		).rejects.toThrow(new ValidationError("status cannot be empty when provided"));
	});

	it("CreateInventoryStockDailyUsecase defaults date and qty values", async () => {
		const service = { create: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateInventoryStockDailyUsecase({ inventoryStockDailyService: service });
		await usecase.execute();
		await usecase.execute({ placeId: 1, ingredientId: 2 });
		expect(service.create).toHaveBeenCalledWith({
			placeId: 1,
			ingredientId: 2,
			date: expect.any(Date),
			openingQty: 0,
			closingQty: 0,
			diffQty: null
		});
	});

	it("CreatePlaceStockUsecase default arg branch", async () => {
		const usecase = new CreatePlaceStockUsecase({ placeStockService: { createPlaceStock: jest.fn() } });
		await usecase.execute();
	});
});
