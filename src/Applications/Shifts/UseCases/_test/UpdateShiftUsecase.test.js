import { jest } from "@jest/globals";
import UpdateShiftUsecase from "../UpdateShiftUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";

describe("UpdateShiftUsecase", () => {
	let shiftService;
	let placeService;
	let usecase;
	let existing;

	beforeEach(() => {
		shiftService = { getShift: jest.fn(), updateShift: jest.fn() };
		placeService = { getPlace: jest.fn().mockResolvedValue({ id: 1 }), supportsPlaceValidation: true };
		existing = { id: 1, placeId: 1, name: "Morning" };
		shiftService.getShift.mockResolvedValue(existing);
		usecase = new UpdateShiftUsecase({ shiftService, placeService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateShiftUsecase()).toThrow("SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when payload not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when shift not found", async () => {
		shiftService.getShift.mockResolvedValue(null);
		await expect(usecase.execute(1, { name: "New" })).rejects.toThrow(AppError);
	});

	test("should throw when no updatable fields", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No updatable fields provided"));
	});

	test("should throw when place invalid", async () => {
		placeService.getPlace.mockResolvedValue(null);
		await expect(usecase.execute(1, { placeId: "2" })).rejects.toThrow(
			new ValidationError("placeId not found")
		);
	});

	test("should throw when name empty", async () => {
		await expect(usecase.execute(1, { name: "  " })).rejects.toThrow(
			new ValidationError("name cannot be empty")
		);
	});

	test("should throw when time invalid", async () => {
		await expect(usecase.execute(1, { startTime: 123 })).rejects.toThrow(
			new ValidationError("startTime must be a string")
		);
	});

	test("should update shift with normalized payload", async () => {
		const updated = { id: 1, name: "New" };
		shiftService.updateShift.mockResolvedValue(updated);

		const result = await usecase.execute("1", {
			placeId: "1",
			name: " New ",
			startTime: "08:00",
			endTime: "17:00",
			isActive: false
		});

		expect(shiftService.updateShift).toHaveBeenCalledWith({
			id: 1,
			data: { placeId: 1, name: "New", startTime: "08:00", endTime: "17:00", isActive: false }
		});
		expect(result).toEqual(updated);
	});
});
