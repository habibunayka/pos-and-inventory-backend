import * as usecases from "../index.js";
import ListPlacesUsecase from "../ListPlacesUsecase.js";
import GetPlaceUsecase from "../GetPlaceUsecase.js";
import CreatePlaceUsecase from "../CreatePlaceUsecase.js";
import UpdatePlaceUsecase from "../UpdatePlaceUsecase.js";
import DeletePlaceUsecase from "../DeletePlaceUsecase.js";

describe("Places Usecases index exports", () => {
	test("should export ListPlacesUsecase", () => {
		expect(usecases.ListPlacesUsecase).toBe(ListPlacesUsecase);
	});

	test("should export GetPlaceUsecase", () => {
		expect(usecases.GetPlaceUsecase).toBe(GetPlaceUsecase);
	});

	test("should export CreatePlaceUsecase", () => {
		expect(usecases.CreatePlaceUsecase).toBe(CreatePlaceUsecase);
	});

	test("should export UpdatePlaceUsecase", () => {
		expect(usecases.UpdatePlaceUsecase).toBe(UpdatePlaceUsecase);
	});

	test("should export DeletePlaceUsecase", () => {
		expect(usecases.DeletePlaceUsecase).toBe(DeletePlaceUsecase);
	});
});
