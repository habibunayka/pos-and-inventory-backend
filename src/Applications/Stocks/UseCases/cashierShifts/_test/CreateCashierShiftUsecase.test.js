import { jest } from "@jest/globals";
import CreateCashierShiftUsecase from "../CreateCashierShiftUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CreateCashierShiftUsecase", () => {
	let cashierShiftService;
	let placeService;
	let stationService;
	let shiftService;
	let usecase;

	beforeEach(() => {
		cashierShiftService = { create: jest.fn() };
		placeService = { getPlace: jest.fn().mockResolvedValue({ id: 1 }), supportsPlaceValidation: true };
		stationService = { getStation: jest.fn().mockResolvedValue({ id: 2, placeId: 1 }) };
		shiftService = { getShift: jest.fn().mockResolvedValue({ id: 3, placeId: 1 }) };
		usecase = new CreateCashierShiftUsecase({
			cashierShiftService,
			placeService,
			stationService,
			shiftService
		});
	});

	test("should throw when service missing", () => {
		expect(() => new CreateCashierShiftUsecase()).toThrow("CASHIER_SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when ipAddress empty", async () => {
		await expect(
			usecase.execute({ placeId: 1, stationId: 2, shiftId: 3, cashierId: 4, ipAddress: " " })
		).rejects.toThrow(new ValidationError("ipAddress is required"));
	});

	test("should throw when openingBalance is invalid", async () => {
		await expect(
			usecase.execute({ placeId: 1, stationId: 2, shiftId: 3, cashierId: 4, ipAddress: "1.1.1.1", openingBalance: "abc" })
		).rejects.toThrow(new ValidationError("openingBalance must be a number"));
	});

	test("should create cashier shift with normalized payload", async () => {
		const created = { id: 10 };
		cashierShiftService.create.mockResolvedValue(created);

		const result = await usecase.execute({
			placeId: "1",
			stationId: "2",
			shiftId: "3",
			cashierId: "4",
			ipAddress: " 1.1.1.1 ",
			openingBalance: "100",
			status: " open "
		});

		expect(cashierShiftService.create).toHaveBeenCalledWith({
			placeId: 1,
			stationId: 2,
			shiftId: 3,
			cashierId: 4,
			ipAddress: "1.1.1.1",
			openingBalance: 100,
			status: "open"
		});
		expect(result).toEqual(created);
	});
});
