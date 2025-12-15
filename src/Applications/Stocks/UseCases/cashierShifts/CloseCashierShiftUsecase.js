import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BaseCashierShiftUsecase from "./BaseCashierShiftUsecase.js";

function normalizeNumber(value, fieldName) {
	if (value == null) return null;
	const num = Number(value);
	if (!Number.isFinite(num)) throw new ValidationError(`${fieldName} must be a number`);
	return num;
}

export default class CloseCashierShiftUsecase extends BaseCashierShiftUsecase {
	async execute(id, payload = {}) {
		const shiftId = this._validateId(id, "id");
		this._ensureObject(payload);

		const existing = await this.cashierShiftService.get(shiftId);
		if (!existing) throw new ValidationError("Cashier shift not found");
		if (existing.closedAt || String(existing.status ?? "").toLowerCase() === "closed") {
			throw new ValidationError("Cashier shift already closed");
		}

		const closedAt =
			payload.closedAt === undefined || payload.closedAt === null
				? new Date()
				: (() => {
						const date = new Date(payload.closedAt);
						if (Number.isNaN(date.getTime())) throw new ValidationError("closedAt must be a valid date");
						return date;
				  })();

		const data = {
			closedAt,
			status: "closed"
		};

		if (Object.prototype.hasOwnProperty.call(payload, "closingBalance")) {
			data.closingBalance = normalizeNumber(payload.closingBalance, "closingBalance");
		}
		if (Object.prototype.hasOwnProperty.call(payload, "systemBalance")) {
			data.systemBalance = normalizeNumber(payload.systemBalance, "systemBalance");
		}

		const rec = await this.cashierShiftService.update({ id: shiftId, data });
		if (!rec) throw new ValidationError("Cashier shift not found");
		return rec;
	}
}
