import BaseShiftUsecase from "./BaseShiftUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class GetShiftUsecase extends BaseShiftUsecase {
	async execute(id) {
		const shiftId = Number(id);
		if (!Number.isInteger(shiftId) || shiftId <= 0) throw new ValidationError("Invalid id");
		const record = await this.shiftService.getShift(shiftId);
		if (!record) throw new ValidationError("Shift not found");
		return record;
	}
}
