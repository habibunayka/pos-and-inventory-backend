import { jest } from "@jest/globals";
import CreatePlaceUsecase from "../CreatePlaceUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreatePlaceUsecase", () => {
	let placeService;
	let usecase;

	beforeEach(() => {
		placeService = { createPlace: jest.fn() };
		usecase = new CreatePlaceUsecase({ placeService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreatePlaceUsecase()).toThrow("PLACE_USECASE.MISSING_SERVICE");
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ name: "   " })).rejects.toThrow(new ValidationError("name is required"));
	});

	test("should create place with normalized payload", async () => {
		const created = { id: 1 };
		placeService.createPlace.mockResolvedValue(created);

		const result = await usecase.execute({
			name: "  Store ",
			address: "  ",
			phone: null,
			logoPath: null,
			type: null,
			isActive: false
		});

		expect(placeService.createPlace).toHaveBeenCalledWith({
			placeData: {
				name: "Store",
				address: null,
				phone: null,
				logoPath: null,
				type: null,
				isActive: false
			}
		});
		expect(result).toEqual(created);
	});
});
