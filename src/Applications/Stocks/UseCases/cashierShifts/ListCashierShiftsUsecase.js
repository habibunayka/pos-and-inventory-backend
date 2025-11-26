import BaseCashierShiftUsecase from "./BaseCashierShiftUsecase.js";

export default class ListCashierShiftsUsecase extends BaseCashierShiftUsecase {
	async execute() {
		return this.cashierShiftService.list();
	}
}
