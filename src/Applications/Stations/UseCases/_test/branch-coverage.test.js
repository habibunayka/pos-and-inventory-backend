import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateStationUsecase from "../CreateStationUsecase.js";
import UpdateStationUsecase from "../UpdateStationUsecase.js";

describe("Stations usecase branch coverage", () => {
	it("CreateStationUsecase default arg branch throws", async () => {
		const usecase = new CreateStationUsecase({ stationService: { createStation: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateStationUsecase handles missing name", async () => {
		const stationService = { createStation: jest.fn() };
		const placeService = { supportsPlaceValidation: false, getPlace: jest.fn() };
		const usecase = new CreateStationUsecase({ stationService, placeService });
		await expect(usecase.execute({ placeId: 1 })).rejects.toThrow(new ValidationError("name is required"));
	});

	it("UpdateStationUsecase guards empty payload", async () => {
		const service = { getStation: jest.fn().mockResolvedValue({ id: 1 }), updateStation: jest.fn() };
		const usecase = new UpdateStationUsecase({ stationService: service });
		await expect(usecase.execute(1, {})).rejects.toThrow(ValidationError);
	});

	it("UpdateStationUsecase normalizes name and description", async () => {
		const service = {
			getStation: jest.fn().mockResolvedValue({ id: 1 }),
			updateStation: jest.fn().mockResolvedValue({ id: 1 })
		};
		const usecase = new UpdateStationUsecase({ stationService: service });
		await expect(usecase.execute(1, { name: null })).rejects.toThrow(new ValidationError("name cannot be empty"));

		await usecase.execute(1, { description: null });
		expect(service.updateStation).toHaveBeenCalledWith({ id: 1, data: { description: null } });
	});
});
