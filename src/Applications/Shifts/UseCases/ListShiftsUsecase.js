import BaseShiftUsecase from "./BaseShiftUsecase.js";

export default class ListShiftsUsecase extends BaseShiftUsecase {
	async execute() {
		return this.shiftService.listShifts();
	}
}
