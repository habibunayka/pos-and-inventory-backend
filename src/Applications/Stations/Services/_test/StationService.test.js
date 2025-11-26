import { jest } from "@jest/globals";
import StationService from "../StationService.js";

describe("StationService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createStation: jest.fn(),
			updateStation: jest.fn(),
			deleteStation: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new StationService()).toThrow("STATION_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new StationService({ stationRepository: badRepo })).toThrow(
			"STATION_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listStations should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new StationService({ stationRepository: mockRepo });

		const result = service.listStations();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getStation should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new StationService({ stationRepository: mockRepo });

		const result = service.getStation(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createStation should delegate to repository", async () => {
		mockRepo.createStation.mockResolvedValue({ id: 3 });
		const service = new StationService({ stationRepository: mockRepo });

		const result = service.createStation({ name: "Station" });

		expect(mockRepo.createStation).toHaveBeenCalledWith({ name: "Station" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateStation should delegate to repository", async () => {
		mockRepo.updateStation.mockResolvedValue({ id: 4 });
		const service = new StationService({ stationRepository: mockRepo });

		const result = service.updateStation({ id: 4, data: { name: "New" } });

		expect(mockRepo.updateStation).toHaveBeenCalledWith({ id: 4, data: { name: "New" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteStation should delegate to repository", async () => {
		mockRepo.deleteStation.mockResolvedValue(true);
		const service = new StationService({ stationRepository: mockRepo });

		const result = service.deleteStation(5);

		expect(mockRepo.deleteStation).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
