import { jest } from "@jest/globals";
import UpdateCashierShiftUsecase from "../UpdateCashierShiftUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("UpdateCashierShiftUsecase", () => {
	let cashierShiftService;
	let placeService;
	let stationService;
	let shiftService;
	let usecase;
	let existing;

	beforeEach(() => {
		cashierShiftService = { get: jest.fn(), update: jest.fn() };
		placeService = { getPlace: jest.fn().mockResolvedValue({ id: 1 }), supportsPlaceValidation: true };
		stationService = { getStation: jest.fn().mockResolvedValue({ id: 2, placeId: 1 }) };
		shiftService = { getShift: jest.fn().mockResolvedValue({ id: 3, placeId: 1 }) };
		existing = { id: 5, placeId: 1, stationId: 2, shiftId: 3 };
		usecase = new UpdateCashierShiftUsecase({
			cashierShiftService,
			placeService,
			stationService,
			shiftService
		});
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateCashierShiftUsecase()).toThrow("CASHIER_SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payload is not object", async () => {
		cashierShiftService.get.mockResolvedValue(existing);
		await expect(usecase.execute(5, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when record not found", async () => {
		cashierShiftService.get.mockResolvedValue(null);
		await expect(usecase.execute(5, {})).rejects.toThrow(new ValidationError("Cashier shift not found"));
	});

	test("should throw when closedAt invalid", async () => {
		cashierShiftService.get.mockResolvedValue(existing);
		await expect(usecase.execute(5, { closedAt: "not-date" })).rejects.toThrow(
			new ValidationError("closedAt must be a valid date")
		);
	});

	test("should throw when no updatable fields provided", async () => {
		cashierShiftService.get.mockResolvedValue(existing);
		await expect(usecase.execute(5, {})).rejects.toThrow(new ValidationError("No updatable fields provided"));
	});

	test("should revalidate station and shift when place changes without overrides", async () => {
		cashierShiftService.get.mockResolvedValue(existing);
		cashierShiftService.update.mockResolvedValue({ id: 5, status: "open" });
		const stationSpy = jest.spyOn(usecase, "_validateStationId");
		const shiftSpy = jest.spyOn(usecase, "_validateShiftId");
		stationService.getStation.mockResolvedValue({ id: 2, placeId: 2 });
		shiftService.getShift.mockResolvedValue({ id: 3, placeId: 2 });

		await usecase.execute(5, { placeId: 2, closedAt: null });

		expect(stationSpy).toHaveBeenCalledWith(existing.stationId, 2);
		expect(shiftSpy).toHaveBeenCalledWith(existing.shiftId, 2);
		expect(cashierShiftService.update).toHaveBeenCalledWith({
			id: 5,
			data: { placeId: 2, closedAt: null }
		});
	});

	test("should update cashier shift with normalized payload", async () => {
		cashierShiftService.get.mockResolvedValue(existing);
		cashierShiftService.update.mockResolvedValue({ id: 5, status: "closed" });

		const result = await usecase.execute("5", {
			placeId: "1",
			stationId: "2",
			shiftId: "3",
			closedAt: "2023-01-01T00:00:00.000Z",
			closingBalance: "10",
			systemBalance: null,
			status: " closed "
		});

		expect(cashierShiftService.update).toHaveBeenCalledWith({
			id: 5,
			data: {
				placeId: 1,
				stationId: 2,
				shiftId: 3,
				closedAt: expect.any(Date),
				closingBalance: 10,
				systemBalance: null,
				status: "closed"
			}
		});
		expect(result).toEqual({ id: 5, status: "closed" });
	});

	test("should validate station/shift presence and balances/status", async () => {
		cashierShiftService.get.mockResolvedValue(existing);
		stationService.getStation.mockResolvedValue(null);
		await expect(usecase.execute(5, { stationId: 9 })).rejects.toThrow(
			new ValidationError("stationId not found")
		);

		stationService.getStation.mockResolvedValue({ id: 2, placeId: 1 });
		shiftService.getShift.mockResolvedValue(null);
		await expect(usecase.execute(5, { shiftId: 8 })).rejects.toThrow(new ValidationError("shiftId not found"));

		shiftService.getShift.mockResolvedValue({ id: 3, placeId: 1 });
		await expect(usecase.execute(5, { closingBalance: "abc" })).rejects.toThrow(
			new ValidationError("closingBalance must be a number")
		);

		await expect(usecase.execute(5, { systemBalance: "abc" })).rejects.toThrow(
			new ValidationError("systemBalance must be a number")
		);

		await expect(usecase.execute(5, { status: "   " })).rejects.toThrow(
			new ValidationError("status cannot be empty when provided")
		);
	});

	test("should throw when update returns null", async () => {
		cashierShiftService.get.mockResolvedValue(existing);
		cashierShiftService.update.mockResolvedValue(null);

		await expect(usecase.execute(5, { status: "closed" })).rejects.toThrow(
			new ValidationError("Cashier shift not found")
		);
	});
});
