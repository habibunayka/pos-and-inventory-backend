import { jest } from "@jest/globals";
import GetPlaceUsecase from "../GetPlaceUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";

describe("GetPlaceUsecase", () => {
	let placeService;
	let usecase;

	beforeEach(() => {
		placeService = { getPlace: jest.fn() };
		usecase = new GetPlaceUsecase({ placeService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetPlaceUsecase()).toThrow("PLACE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when place not found", async () => {
		placeService.getPlace.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should return place when found", async () => {
		placeService.getPlace.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(placeService.getPlace).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
