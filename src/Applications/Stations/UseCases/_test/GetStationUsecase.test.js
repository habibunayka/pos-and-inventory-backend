import { jest } from "@jest/globals";
import GetStationUsecase from "../GetStationUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetStationUsecase", () => {
	let stationService;
	let usecase;

	beforeEach(() => {
		stationService = { getStation: jest.fn() };
		usecase = new GetStationUsecase({ stationService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetStationUsecase()).toThrow("STATION_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when station not found", async () => {
		stationService.getStation.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Station not found"));
	});

	test("should return station when found", async () => {
		stationService.getStation.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(stationService.getStation).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
