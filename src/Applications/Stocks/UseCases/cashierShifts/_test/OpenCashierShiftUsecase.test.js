import { jest } from "@jest/globals";
import OpenCashierShiftUsecase from "../OpenCashierShiftUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("OpenCashierShiftUsecase", () => {
	let cashierShiftService;
	let placeService;
	let stationService;
	let shiftService;
	let usecase;

	beforeEach(() => {
		cashierShiftService = { create: jest.fn() };
		placeService = { getPlace: jest.fn().mockResolvedValue({ id: 1 }) };
		stationService = { getStation: jest.fn().mockResolvedValue({ id: 2, placeId: 1 }) };
		shiftService = { getShift: jest.fn().mockResolvedValue({ id: 3, placeId: 1 }) };

		usecase = new OpenCashierShiftUsecase({
			cashierShiftService,
			placeService,
			stationService,
			shiftService
		});
	});

	test("should throw when service is missing", () => {
		expect(() => new OpenCashierShiftUsecase()).toThrow("CASHIER_SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should throw validation error when ipAddress is empty", async () => {
		await expect(
			usecase.execute({ placeId: 1, stationId: 2, shiftId: 3, cashierId: 4, ipAddress: "   " })
		).rejects.toThrow(new ValidationError("ipAddress is required"));
	});

	test("should throw validation error when station place mismatch", async () => {
		stationService.getStation.mockResolvedValue({ id: 2, placeId: 99 });

		await expect(
			usecase.execute({ placeId: 1, stationId: 2, shiftId: 3, cashierId: 4, ipAddress: "1.1.1.1" })
		).rejects.toThrow(new ValidationError("stationId does not belong to placeId"));
	});

	test("should open shift and delegate to service", async () => {
		const payload = {
			placeId: 1,
			stationId: 2,
			shiftId: 3,
			cashierId: 4,
			ipAddress: " 127.0.0.1 ",
			openingBalance: "500"
		};

		const created = { id: 10, ...payload, ipAddress: "127.0.0.1", status: "open", closedAt: null };
		cashierShiftService.create.mockResolvedValue(created);

		const result = await usecase.execute(payload);

		expect(placeService.getPlace).toHaveBeenCalledWith(1);
		expect(stationService.getStation).toHaveBeenCalledWith(2);
		expect(shiftService.getShift).toHaveBeenCalledWith(3);
		expect(cashierShiftService.create).toHaveBeenCalledWith({
			placeId: 1,
			stationId: 2,
			shiftId: 3,
			cashierId: 4,
			ipAddress: "127.0.0.1",
			openingBalance: 500,
			status: "open",
			closedAt: null
		});
		expect(result).toBe(created);
	});
});
