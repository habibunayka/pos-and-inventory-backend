import { jest } from "@jest/globals";
import PlaceService from "../PlaceService.js";

describe("PlaceService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createPlace: jest.fn(),
			updatePlace: jest.fn(),
			deletePlace: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new PlaceService()).toThrow("PLACE_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new PlaceService({ placeRepository: badRepo })).toThrow(
			"PLACE_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listPlaces should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new PlaceService({ placeRepository: mockRepo });

		const result = service.listPlaces();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getPlace should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new PlaceService({ placeRepository: mockRepo });

		const result = service.getPlace(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createPlace should delegate to repository", async () => {
		mockRepo.createPlace.mockResolvedValue({ id: 3 });
		const service = new PlaceService({ placeRepository: mockRepo });

		const result = service.createPlace({ foo: "bar" });

		expect(mockRepo.createPlace).toHaveBeenCalledWith({ foo: "bar" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updatePlace should delegate to repository", async () => {
		mockRepo.updatePlace.mockResolvedValue({ id: 4 });
		const service = new PlaceService({ placeRepository: mockRepo });

		const result = service.updatePlace({ id: 4, data: { name: "New" } });

		expect(mockRepo.updatePlace).toHaveBeenCalledWith({ id: 4, data: { name: "New" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deletePlace should delegate to repository", async () => {
		mockRepo.deletePlace.mockResolvedValue(true);
		const service = new PlaceService({ placeRepository: mockRepo });

		const result = service.deletePlace(5);

		expect(mockRepo.deletePlace).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
