import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BasePlaceUsecase from "../BasePlaceUsecase.js";
import CreatePlaceUsecase from "../CreatePlaceUsecase.js";
import UpdatePlaceUsecase from "../UpdatePlaceUsecase.js";

describe("Places usecase branch coverage", () => {
	class TestPlaceUsecase extends BasePlaceUsecase {
		constructor() {
			super({ placeService: {} });
		}
	}

	it("BasePlaceUsecase normalizes payload defaults", () => {
		const usecase = new TestPlaceUsecase();
		expect(usecase._normalizePayload()).toEqual({});

		const normalized = usecase._normalizePayload({ phone: "  ", type: "  " });
		expect(normalized).toEqual({ phone: null, type: null });
	});

	it("UpdatePlaceUsecase default payload branch", async () => {
		const usecase = new UpdatePlaceUsecase({ placeService: { updatePlace: jest.fn().mockResolvedValue({}) } });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);
	});

	it("CreatePlaceUsecase default arg branch", async () => {
		const usecase = new CreatePlaceUsecase({ placeService: { createPlace: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreatePlaceUsecase defaults isActive to true", async () => {
		const placeService = { createPlace: jest.fn().mockResolvedValue({}) };
		const usecase = new CreatePlaceUsecase({ placeService });
		await usecase.execute({ name: "Place" });
		expect(placeService.createPlace).toHaveBeenCalledWith({
			placeData: {
				name: "Place",
				address: null,
				phone: null,
				logoPath: null,
				type: null,
				isActive: true
			}
		});
	});
});
