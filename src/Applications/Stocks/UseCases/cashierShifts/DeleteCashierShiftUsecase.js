import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BaseCashierShiftUsecase from "./BaseCashierShiftUsecase.js";

export default class DeleteCashierShiftUsecase extends BaseCashierShiftUsecase {
	async execute(id) {
		const intId = this._validateId(id, "id");
		const ok = await this.cashierShiftService.delete(intId);
		if (!ok) throw new ValidationError("Cashier shift not found");
		return true;
	}
}
