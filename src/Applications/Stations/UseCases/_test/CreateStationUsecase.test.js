import { jest } from "@jest/globals";
import CreateStationUsecase from "../CreateStationUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateStationUsecase", () => {
	let stationService;
	let placeService;
	let usecase;

	beforeEach(() => {
		stationService = { createStation: jest.fn() };
		placeService = { getPlace: jest.fn().mockResolvedValue({ id: 1 }), supportsPlaceValidation: true };
		usecase = new CreateStationUsecase({ stationService, placeService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateStationUsecase()).toThrow("STATION_USECASE.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ placeId: 1, name: "  " })).rejects.toThrow(
			new ValidationError("name is required")
		);
	});

	test("should create station with normalized payload", async () => {
		const created = { id: 2 };
		stationService.createStation.mockResolvedValue(created);

		const result = await usecase.execute({
			placeId: "1",
			name: " Station ",
			description: " desc ",
			isActive: true
		});

		expect(stationService.createStation).toHaveBeenCalledWith({
			placeId: 1,
			name: "Station",
			description: "desc",
			isActive: true
		});
		expect(result).toEqual(created);
	});
});
