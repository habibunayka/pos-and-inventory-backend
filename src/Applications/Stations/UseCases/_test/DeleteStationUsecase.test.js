import { jest } from "@jest/globals";
import DeleteStationUsecase from "../DeleteStationUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteStationUsecase", () => {
	let stationService;
	let usecase;

	beforeEach(() => {
		stationService = { deleteStation: jest.fn() };
		usecase = new DeleteStationUsecase({ stationService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteStationUsecase()).toThrow("STATION_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		stationService.deleteStation.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Station not found"));
	});

	test("should delete station", async () => {
		stationService.deleteStation.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(stationService.deleteStation).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
