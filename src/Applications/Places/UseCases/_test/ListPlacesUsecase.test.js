import { jest } from "@jest/globals";
import ListPlacesUsecase from "../ListPlacesUsecase.js";

describe("ListPlacesUsecase", () => {
	let placeService;
	let usecase;

	beforeEach(() => {
		placeService = { listPlaces: jest.fn() };
		usecase = new ListPlacesUsecase({ placeService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListPlacesUsecase()).toThrow("PLACE_USECASE.MISSING_SERVICE");
	});

	test("should list places", async () => {
		const records = [{ id: 1 }];
		placeService.listPlaces.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(placeService.listPlaces).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
