import BaseShiftUsecase from "./BaseShiftUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";
import AppError from "../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../Commons/Constants/HttpStatus.js";

export default class DeleteShiftUsecase extends BaseShiftUsecase {
	async execute(id) {
		const shiftId = Number(id);
		if (!Number.isInteger(shiftId) || shiftId <= 0) {
			throw new ValidationError("Invalid id");
		}

		const existing = await this.shiftService.getShift(shiftId);
		if (!existing) throw new AppError("Shift not found", HttpStatus.NOT_FOUND);

		const deleted = await this.shiftService.deleteShift(shiftId);
		if (!deleted) throw new ValidationError("Shift not found");
		return true;
	}
}
