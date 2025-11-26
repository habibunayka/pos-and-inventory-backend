import { jest } from "@jest/globals";
import BaseCashierShiftUsecase from "../BaseCashierShiftUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseCashierShiftUsecase {}

describe("BaseCashierShiftUsecase", () => {
	let placeService;
	let stationService;
	let shiftService;

	beforeEach(() => {
		placeService = { getPlace: jest.fn(), supportsPlaceValidation: true };
		stationService = { getStation: jest.fn() };
		shiftService = { getShift: jest.fn() };
	});

	test("should throw when cashierShiftService missing", () => {
		expect(() => new BaseCashierShiftUsecase()).toThrow("CASHIER_SHIFT_USECASE.MISSING_SERVICE");
	});

	test("_ensureObject should throw on invalid payload", () => {
		const usecase = new DummyUsecase({ cashierShiftService: {}, placeService });
		expect(() => usecase._ensureObject(null)).toThrow(new ValidationError("Payload must be an object"));
		expect(() => usecase._ensureObject([])).toThrow(new ValidationError("Payload must be an object"));
	});

	test("_validateId should normalize valid ids", () => {
		const usecase = new DummyUsecase({ cashierShiftService: {}, placeService });
		expect(usecase._validateId("5", "cashierId")).toBe(5);
	});

	test("_validateId should throw on invalid ids", () => {
		const usecase = new DummyUsecase({ cashierShiftService: {}, placeService });
		expect(() => usecase._validateId("abc", "cashierId")).toThrow(
			new ValidationError("cashierId must be a positive integer")
		);
	});

	test("_validatePlaceId should short-circuit when validation disabled", async () => {
		const usecase = new DummyUsecase({
			cashierShiftService: {},
			placeService: { getPlace: jest.fn(), supportsPlaceValidation: false }
		});

		await expect(usecase._validatePlaceId("3")).resolves.toBe(3);
	});

	test("_validatePlaceId should throw when place not found", async () => {
		placeService.getPlace.mockResolvedValue(null);
		const usecase = new DummyUsecase({ cashierShiftService: {}, placeService });

		await expect(usecase._validatePlaceId(1)).rejects.toThrow(new ValidationError("placeId not found"));
	});

	test("_validateStationId should validate ownership", async () => {
		stationService.getStation.mockResolvedValue({ id: 2, placeId: 5 });
		const usecase = new DummyUsecase({ cashierShiftService: {}, placeService, stationService });

		await expect(usecase._validateStationId(2, 5)).resolves.toBe(2);
		await expect(usecase._validateStationId(2, 6)).rejects.toThrow(
			new ValidationError("stationId does not belong to placeId")
		);
	});

	test("_validateShiftId should validate ownership", async () => {
		shiftService.getShift.mockResolvedValue({ id: 3, placeId: 5 });
		const usecase = new DummyUsecase({ cashierShiftService: {}, placeService, shiftService });

		await expect(usecase._validateShiftId(3, 5)).resolves.toBe(3);
		await expect(usecase._validateShiftId(3, 6)).rejects.toThrow(
			new ValidationError("shiftId does not belong to placeId")
		);
	});
});
