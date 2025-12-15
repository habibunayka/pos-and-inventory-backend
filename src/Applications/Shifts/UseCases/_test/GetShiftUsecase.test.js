import { jest } from "@jest/globals";
import GetShiftUsecase from "../GetShiftUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";

describe("GetShiftUsecase", () => {
	let shiftService;
	let usecase;

	beforeEach(() => {
		shiftService = { getShift: jest.fn() };
		usecase = new GetShiftUsecase({ shiftService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetShiftUsecase()).toThrow("SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when shift not found", async () => {
		shiftService.getShift.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should return shift when found", async () => {
		shiftService.getShift.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(shiftService.getShift).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
