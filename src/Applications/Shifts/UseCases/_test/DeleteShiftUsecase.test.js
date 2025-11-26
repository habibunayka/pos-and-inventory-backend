import { jest } from "@jest/globals";
import DeleteShiftUsecase from "../DeleteShiftUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";

describe("DeleteShiftUsecase", () => {
	let shiftService;
	let usecase;

	beforeEach(() => {
		shiftService = { getShift: jest.fn(), deleteShift: jest.fn() };
		usecase = new DeleteShiftUsecase({ shiftService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteShiftUsecase()).toThrow("SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when shift not found", async () => {
		shiftService.getShift.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should delete shift when found", async () => {
		shiftService.getShift.mockResolvedValue({ id: 2 });
		shiftService.deleteShift.mockResolvedValue(true);

		await usecase.execute("2");

		expect(shiftService.deleteShift).toHaveBeenCalledWith(2);
	});
});
