import { jest } from "@jest/globals";
import ListStationsUsecase from "../ListStationsUsecase.js";

describe("ListStationsUsecase", () => {
	let stationService;
	let usecase;

	beforeEach(() => {
		stationService = { listStations: jest.fn() };
		usecase = new ListStationsUsecase({ stationService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListStationsUsecase()).toThrow("STATION_USECASE.MISSING_SERVICE");
	});

	test("should list stations", async () => {
		const records = [{ id: 1 }];
		stationService.listStations.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(stationService.listStations).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
