import { jest } from "@jest/globals";
import CreateShiftUsecase from "../CreateShiftUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateShiftUsecase", () => {
	let shiftService;
	let placeService;
	let usecase;

	beforeEach(() => {
		shiftService = { createShift: jest.fn() };
		placeService = { getPlace: jest.fn().mockResolvedValue({ id: 1 }), supportsPlaceValidation: true };
		usecase = new CreateShiftUsecase({ shiftService, placeService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateShiftUsecase()).toThrow("SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ placeId: 1, name: "   " })).rejects.toThrow(
			new ValidationError("name is required")
		);
	});

	test("should throw when place not found", async () => {
		placeService.getPlace.mockResolvedValue(null);

		await expect(usecase.execute({ placeId: 1, name: "Morning" })).rejects.toThrow(
			new ValidationError("placeId not found")
		);
	});

	test("should create shift with normalized payload", async () => {
		const created = { id: 2 };
		shiftService.createShift.mockResolvedValue(created);

		const result = await usecase.execute({
			placeId: "1",
			name: " Morning ",
			startTime: "08:00",
			endTime: "17:00",
			isActive: true
		});

		expect(shiftService.createShift).toHaveBeenCalledWith({
			placeId: 1,
			name: "Morning",
			startTime: "08:00",
			endTime: "17:00",
			isActive: true
		});
		expect(result).toEqual(created);
	});
});
