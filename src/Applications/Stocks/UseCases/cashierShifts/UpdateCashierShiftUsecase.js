import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BaseCashierShiftUsecase from "./BaseCashierShiftUsecase.js";

function normalizeNumber(value, fieldName) {
	if (value == null) return null;
	const num = Number(value);
	if (!Number.isFinite(num)) throw new ValidationError(`${fieldName} must be a number`);
	return num;
}

export default class UpdateCashierShiftUsecase extends BaseCashierShiftUsecase {
	async execute(id, payload = {}) {
		const shiftId = this._validateId(id, "id");
		this._ensureObject(payload);

		const existing = await this.cashierShiftService.get(shiftId);
		if (!existing) throw new ValidationError("Cashier shift not found");

		const data = {};
		if (Object.prototype.hasOwnProperty.call(payload, "placeId")) {
			data.placeId = await this._validatePlaceId(payload.placeId);
		}

		const effectivePlaceId = data.placeId ?? existing.placeId;

		if (Object.prototype.hasOwnProperty.call(payload, "stationId")) {
			data.stationId = await this._validateStationId(payload.stationId, effectivePlaceId);
		} else if (data.placeId !== undefined) {
			await this._validateStationId(existing.stationId, data.placeId);
		}

		if (Object.prototype.hasOwnProperty.call(payload, "shiftId")) {
			data.shiftId = await this._validateShiftId(payload.shiftId, effectivePlaceId);
		} else if (data.placeId !== undefined) {
			await this._validateShiftId(existing.shiftId, data.placeId);
		}

		if (Object.prototype.hasOwnProperty.call(payload, "closedAt")) {
			if (payload.closedAt === null) {
				data.closedAt = null;
			} else {
				const closedAt = new Date(payload.closedAt);
				if (Number.isNaN(closedAt.getTime())) throw new ValidationError("closedAt must be a valid date");
				data.closedAt = closedAt;
			}
		}

		if (Object.prototype.hasOwnProperty.call(payload, "closingBalance")) {
			data.closingBalance = normalizeNumber(payload.closingBalance, "closingBalance");
		}
		if (Object.prototype.hasOwnProperty.call(payload, "systemBalance")) {
			data.systemBalance = normalizeNumber(payload.systemBalance, "systemBalance");
		}
		if (Object.prototype.hasOwnProperty.call(payload, "status")) {
			const status = String(payload.status ?? "").trim();
			if (!status) throw new ValidationError("status cannot be empty when provided");
			data.status = status;
		}

		if (Object.keys(data).length === 0) throw new ValidationError("No updatable fields provided");

		const rec = await this.cashierShiftService.update({ id: shiftId, data });
		if (!rec) throw new ValidationError("Cashier shift not found");
		return rec;
	}
}
