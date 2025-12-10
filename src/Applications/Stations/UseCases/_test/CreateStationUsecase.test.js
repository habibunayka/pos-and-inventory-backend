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

	test("should default description to null when omitted or empty", async () => {
		stationService.createStation.mockResolvedValue({});

		await usecase.execute({ placeId: 1, name: "Station" });
		expect(stationService.createStation).toHaveBeenCalledWith({ placeId: 1, name: "Station", description: null });

		await usecase.execute({ placeId: 1, name: "Station", description: "   ", isActive: 0 });
		expect(stationService.createStation).toHaveBeenLastCalledWith({
			placeId: 1,
			name: "Station",
			description: null,
			isActive: false
		});
	});

	test("should keep null description when explicitly provided", async () => {
		stationService.createStation.mockResolvedValue({});

		await usecase.execute({ placeId: 1, name: "Station", description: null });
		expect(stationService.createStation).toHaveBeenLastCalledWith({
			placeId: 1,
			name: "Station",
			description: null
		});
	});

	test("should validate placeId and skip validation when disabled", async () => {
		await expect(usecase.execute({ placeId: "abc", name: "Station" })).rejects.toThrow(
			new ValidationError("placeId must be a positive integer")
		);

		placeService.getPlace.mockResolvedValue(null);
		await expect(usecase.execute({ placeId: 2, name: "Station" })).rejects.toThrow(
			new ValidationError("placeId not found")
		);

		const noValidation = new CreateStationUsecase({ stationService, placeService: { supportsPlaceValidation: false } });
		await noValidation.execute({ placeId: 3, name: "X" });
		expect(stationService.createStation).toHaveBeenLastCalledWith({ placeId: 3, name: "X", description: null });
	});
});
