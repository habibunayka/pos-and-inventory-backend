import { jest } from "@jest/globals";
import UpdateStationUsecase from "../UpdateStationUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateStationUsecase", () => {
	let stationService;
	let placeService;
	let usecase;

	beforeEach(() => {
		stationService = { getStation: jest.fn(), updateStation: jest.fn() };
		placeService = { getPlace: jest.fn().mockResolvedValue({ id: 1 }), supportsPlaceValidation: true };
		stationService.getStation.mockResolvedValue({ id: 1, placeId: 1, name: "Station" });
		usecase = new UpdateStationUsecase({ stationService, placeService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateStationUsecase()).toThrow("STATION_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payload not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when station not found", async () => {
		stationService.getStation.mockResolvedValue(null);
		await expect(usecase.execute(1, { name: "New" })).rejects.toThrow(new ValidationError("Station not found"));
	});

	test("should throw when name empty", async () => {
		await expect(usecase.execute(1, { name: "  " })).rejects.toThrow(new ValidationError("name cannot be empty"));
	});

	test("should throw when no updatable fields", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No updatable fields provided"));
	});

	test("should update station with validated placeId", async () => {
		const updated = { id: 1, name: "New" };
		stationService.updateStation.mockResolvedValue(updated);

		const result = await usecase.execute("1", {
			placeId: "1",
			name: " New ",
			description: " desc ",
			isActive: false
		});

		expect(stationService.updateStation).toHaveBeenCalledWith({
			id: 1,
			data: { placeId: 1, name: "New", description: "desc", isActive: false }
		});
		expect(result).toEqual(updated);
	});
});
