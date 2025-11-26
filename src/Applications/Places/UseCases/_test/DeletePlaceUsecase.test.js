import { jest } from "@jest/globals";
import DeletePlaceUsecase from "../DeletePlaceUsecase.js";
import AppError from "../../../../Commons/Errors/AppError.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeletePlaceUsecase", () => {
	let placeService;
	let usecase;

	beforeEach(() => {
		placeService = { getPlace: jest.fn(), deletePlace: jest.fn() };
		usecase = new DeletePlaceUsecase({ placeService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeletePlaceUsecase()).toThrow("PLACE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when place not found", async () => {
		placeService.getPlace.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should delete place when exists", async () => {
		placeService.getPlace.mockResolvedValue({ id: 2 });
		placeService.deletePlace.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(placeService.deletePlace).toHaveBeenCalledWith(2);
		expect(result).toBeUndefined();
	});
});
