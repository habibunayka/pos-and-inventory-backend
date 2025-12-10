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
			description: "  desc ",
			isActive: true
		});

		expect(shiftService.createShift).toHaveBeenCalledWith({
			placeId: 1,
			name: "Morning",
			startTime: "08:00",
			endTime: "17:00",
			description: "desc",
			isActive: true
		});
		expect(result).toEqual(created);
	});

	test("should allow optional description/isActive to be omitted", async () => {
		shiftService.createShift.mockResolvedValue({});
		await usecase.execute({
			placeId: 1,
			name: "Name",
			startTime: "08:00",
			endTime: "09:00"
		});

		expect(shiftService.createShift).toHaveBeenCalledWith({
			placeId: 1,
			name: "Name",
			startTime: "08:00",
			endTime: "09:00"
		});
	});

	test("should normalize empty description to null", async () => {
		await usecase.execute({
			placeId: 1,
			name: "Name",
			startTime: "08:00",
			endTime: "09:00",
			description: "   ",
			isActive: 0
		});

		expect(shiftService.createShift).toHaveBeenLastCalledWith({
			placeId: 1,
			name: "Name",
			startTime: "08:00",
			endTime: "09:00",
			description: null,
			isActive: false
		});
	});

	test("should validate time window and placeId without validation service", async () => {
		const noValidation = new CreateShiftUsecase({
			shiftService,
			placeService: { supportsPlaceValidation: false }
		});

		await expect(
			noValidation.execute({ placeId: 1, name: "Name", startTime: "08:00", endTime: "08:00" })
		).rejects.toThrow(new ValidationError("endTime must be different from startTime"));
	});

	test("should throw when time types invalid", async () => {
		await expect(
			usecase.execute({ placeId: 1, name: "Name", startTime: 123, endTime: "08:00" })
		).rejects.toThrow(new ValidationError("startTime must be a string"));
	});

	test("should reject empty or malformed time strings", async () => {
		await expect(
			usecase.execute({ placeId: 1, name: "Name", startTime: "   ", endTime: "08:00" })
		).rejects.toThrow(new ValidationError("startTime is required"));
		await expect(
			usecase.execute({ placeId: 1, name: "Name", startTime: "8:00", endTime: "09:00" })
		).rejects.toThrow(new ValidationError("startTime must match HH:mm or HH:mm:ss"));
	});

	test("should validate placeId presence and integer", async () => {
		await expect(usecase.execute({ name: "Name", startTime: "08:00", endTime: "09:00" })).rejects.toThrow(
			new ValidationError("placeId is required")
		);
		await expect(usecase.execute({ placeId: "abc", name: "Name", startTime: "08:00", endTime: "09:00" })).rejects.toThrow(
			new ValidationError("placeId must be a positive integer")
		);
	});
});
