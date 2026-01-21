import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BaseShiftUsecase from "../BaseShiftUsecase.js";
import CreateShiftUsecase from "../CreateShiftUsecase.js";
import UpdateShiftUsecase from "../UpdateShiftUsecase.js";

describe("Shifts usecase branch coverage", () => {
	class TestShiftUsecase extends BaseShiftUsecase {
		constructor() {
			super({ shiftService: {} });
		}
	}

	it("BaseShiftUsecase uses default fieldName in _toInt", () => {
		const usecase = new TestShiftUsecase();
		expect(usecase._toInt("5")).toBe(5);
	});

	it("CreateShiftUsecase default arg branch throws", async () => {
		const usecase = new CreateShiftUsecase({ shiftService: { createShift: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateShiftUsecase covers nullish name and empty description", async () => {
		const shiftService = { createShift: jest.fn() };
		const placeService = { supportsPlaceValidation: false, getPlace: jest.fn() };
		const usecase = new CreateShiftUsecase({ shiftService, placeService });

		await expect(usecase.execute({ placeId: 1, startTime: "08:00", endTime: "09:00" })).rejects.toThrow(
			new ValidationError("name is required")
		);

		await usecase.execute({
			placeId: 1,
			name: "DescNull",
			startTime: "08:00",
			endTime: "09:00",
			description: ""
		});

		expect(shiftService.createShift).toHaveBeenLastCalledWith({
			placeId: 1,
			name: "DescNull",
			startTime: "08:00",
			endTime: "09:00",
			description: null
		});
	});

	it("UpdateShiftUsecase rejects null name", async () => {
		const shiftService = {
			getShift: jest.fn().mockResolvedValue({ id: 1, startTime: "08:00", endTime: "09:00" }),
			updateShift: jest.fn()
		};
		const usecase = new UpdateShiftUsecase({ shiftService });
		await expect(usecase.execute(1, { name: null })).rejects.toThrow(ValidationError);
	});

	it("UpdateShiftUsecase handles empty payload", async () => {
		const shiftService = {
			getShift: jest.fn().mockResolvedValue({ id: 1, startTime: "08:00", endTime: "09:00" }),
			updateShift: jest.fn()
		};
		const usecase = new UpdateShiftUsecase({ shiftService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);
	});

	it("UpdateShiftUsecase handles null description", async () => {
		const shiftService = {
			getShift: jest.fn().mockResolvedValue({ id: 1, startTime: "08:00", endTime: "09:00" }),
			updateShift: jest.fn().mockResolvedValue({ id: 1 })
		};
		const usecase = new UpdateShiftUsecase({ shiftService });
		await usecase.execute(1, { description: null });
		expect(shiftService.updateShift).toHaveBeenCalledWith({ id: 1, data: { description: null } });
	});
});
