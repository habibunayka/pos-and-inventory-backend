import { jest } from "@jest/globals";
import BaseStationUsecase from "../BaseStationUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseStationUsecase {}

describe("BaseStationUsecase", () => {
	let placeService;

	beforeEach(() => {
		placeService = { getPlace: jest.fn(), supportsPlaceValidation: true };
	});

	test("should throw when service missing", () => {
		expect(() => new BaseStationUsecase()).toThrow("STATION_USECASE.MISSING_SERVICE");
	});

	test("_ensureObject should throw on invalid payload", () => {
		const usecase = new DummyUsecase({ stationService: {}, placeService });
		expect(() => usecase._ensureObject(null)).toThrow(new ValidationError("Payload must be an object"));
	});

	test("_positiveInt should parse valid ids", () => {
		const usecase = new DummyUsecase({ stationService: {}, placeService });
		expect(usecase._positiveInt("5", "id")).toBe(5);
	});

	test("_positiveInt should throw on invalid ids", () => {
		const usecase = new DummyUsecase({ stationService: {}, placeService });
		expect(() => usecase._positiveInt("abc", "id")).toThrow(new ValidationError("id must be a positive integer"));
	});

	test("_validatePlaceId should validate with placeService", async () => {
		placeService.getPlace.mockResolvedValue({ id: 1 });
		const usecase = new DummyUsecase({ stationService: {}, placeService });

		await expect(usecase._validatePlaceId("1")).resolves.toBe(1);
		expect(placeService.getPlace).toHaveBeenCalledWith(1);
	});

	test("_validatePlaceId should return id when validation disabled", async () => {
		const usecase = new DummyUsecase({
			stationService: {},
			placeService: { supportsPlaceValidation: false, getPlace: jest.fn() }
		});

		await expect(usecase._validatePlaceId("2")).resolves.toBe(2);
	});

	test("_validatePlaceId should throw when place missing", async () => {
		placeService.getPlace.mockResolvedValue(null);
		const usecase = new DummyUsecase({ stationService: {}, placeService });

		await expect(usecase._validatePlaceId(3)).rejects.toThrow(new ValidationError("placeId not found"));
	});
});
