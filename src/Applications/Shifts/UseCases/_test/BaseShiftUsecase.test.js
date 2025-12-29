import { jest } from "@jest/globals";
import BaseShiftUsecase from "../BaseShiftUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseShiftUsecase {}

describe("BaseShiftUsecase", () => {
	let placeService;
	let usecase;

	beforeEach(() => {
		placeService = { getPlace: jest.fn(), supportsPlaceValidation: true };
		usecase = new DummyUsecase({ shiftService: {}, placeService });
	});

	test("should throw when shiftService missing", () => {
		expect(() => new BaseShiftUsecase()).toThrow("SHIFT_USECASE.MISSING_SERVICE");
	});

	test("_toInt should convert valid ids", () => {
		expect(usecase._toInt("5", "id")).toBe(5);
	});

	test("_toInt should throw on invalid ids", () => {
		expect(() => usecase._toInt("abc", "id")).toThrow(new ValidationError("id must be a positive integer"));
	});

	test("_ensureObject should guard payloads", () => {
		expect(() => usecase._ensureObject(null)).toThrow(new ValidationError("Payload must be an object"));
		expect(() => usecase._ensureObject("str")).toThrow(new ValidationError("Payload must be an object"));
		expect(() => usecase._ensureObject({})).not.toThrow();
	});

	test("_validatePlaceId should validate through placeService", async () => {
		placeService.getPlace.mockResolvedValue({ id: 1 });

		await expect(usecase._validatePlaceId("1")).resolves.toBe(1);
		expect(placeService.getPlace).toHaveBeenCalledWith(1);
	});

	test("_validatePlaceId should throw when place not found", async () => {
		placeService.getPlace.mockResolvedValue(null);

		await expect(usecase._validatePlaceId(1)).rejects.toThrow(new ValidationError("placeId not found"));
	});

	test("_validatePlaceId should skip when validation disabled", async () => {
		const usecaseNoValidation = new DummyUsecase({
			shiftService: {},
			placeService: { supportsPlaceValidation: false, getPlace: jest.fn() }
		});

		await expect(usecaseNoValidation._validatePlaceId("2")).resolves.toBe(2);
	});

	test("_validatePlaceId should honor allowNull", async () => {
		await expect(usecase._validatePlaceId(null, { allowNull: true })).resolves.toBeNull();
		await expect(usecase._validatePlaceId(undefined, { allowNull: true })).resolves.toBeNull();
		await expect(usecase._validatePlaceId(null)).rejects.toThrow(new ValidationError("placeId is required"));
	});

	test("_normalizeTime should validate format", () => {
		expect(() => usecase._normalizeTime(123, "startTime")).toThrow(
			new ValidationError("startTime must be a string")
		);
		expect(() => usecase._normalizeTime("   ", "startTime")).toThrow(new ValidationError("startTime is required"));
		expect(() => usecase._normalizeTime("25:00", "startTime")).toThrow(
			new ValidationError("startTime must match HH:mm or HH:mm:ss")
		);
		expect(usecase._normalizeTime("08:30", "startTime")).toBe("08:30");
	});

	test("_validateTimeWindow should reject identical times", () => {
		expect(() => usecase._validateTimeWindow("08:00", "08:00")).toThrow(
			new ValidationError("endTime must be different from startTime")
		);
	});
});
