import { jest } from "@jest/globals";
import UpdatePlaceUsecase from "../UpdatePlaceUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";

describe("UpdatePlaceUsecase", () => {
	let placeService;
	let usecase;

	beforeEach(() => {
		placeService = { updatePlace: jest.fn() };
		usecase = new UpdatePlaceUsecase({ placeService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdatePlaceUsecase()).toThrow("PLACE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("At least one field must be provided"));
	});

	test("should throw when place not found", async () => {
		placeService.updatePlace.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "A" })).rejects.toThrow(AppError);
	});

	test("should update place with normalized payload", async () => {
		placeService.updatePlace.mockResolvedValue({ id: 2, name: "A" });

		const result = await usecase.execute("2", { name: " A ", address: "  ", isActive: false });

		expect(placeService.updatePlace).toHaveBeenCalledWith({
			id: 2,
			placeData: { name: "A", address: null, isActive: false }
		});
		expect(result).toEqual({ id: 2, name: "A" });
	});
});
