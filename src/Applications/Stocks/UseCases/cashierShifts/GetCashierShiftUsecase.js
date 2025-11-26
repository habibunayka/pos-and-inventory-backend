import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BaseCashierShiftUsecase from "./BaseCashierShiftUsecase.js";

export default class GetCashierShiftUsecase extends BaseCashierShiftUsecase {
	async execute(id) {
		const intId = this._validateId(id, "id");
		const rec = await this.cashierShiftService.get(intId);
		if (!rec) throw new ValidationError("Cashier shift not found");
		return rec;
	}
}
