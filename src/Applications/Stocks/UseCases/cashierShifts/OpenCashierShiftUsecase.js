import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BaseCashierShiftUsecase from "./BaseCashierShiftUsecase.js";

function normalizeNumber(value, fieldName) {
	const num = Number(value);
	if (!Number.isFinite(num)) throw new ValidationError(`${fieldName} must be a number`);
	return num;
}

export default class OpenCashierShiftUsecase extends BaseCashierShiftUsecase {
	async execute(payload = {}) {
		this._ensureObject(payload);
		const placeId = await this._validatePlaceId(payload.placeId);
		const stationId = await this._validateStationId(payload.stationId, placeId);
		const shiftId = await this._validateShiftId(payload.shiftId, placeId);
		const cashierId = this._validateId(payload.cashierId, "cashierId");
		const ipAddress = String(payload.ipAddress ?? "").trim();
		if (!ipAddress) throw new ValidationError("ipAddress is required");

		const data = { placeId, stationId, shiftId, cashierId, ipAddress, status: "open", closedAt: null };

		if (payload.openingBalance !== undefined) {
			data.openingBalance = normalizeNumber(payload.openingBalance, "openingBalance");
		}

		return this.cashierShiftService.create(data);
	}
}
