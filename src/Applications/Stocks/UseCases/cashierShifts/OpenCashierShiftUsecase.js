import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BaseCashierShiftUsecase from "./BaseCashierShiftUsecase.js";

function normalizeNumber(value, fieldName) {
	const num = Number(value);
	if (!Number.isFinite(num)) throw new ValidationError(`${fieldName} must be a number`);
	return num;
}

export default class OpenCashierShiftUsecase extends BaseCashierShiftUsecase {
	async execute(payload = {}, { user } = {}) {
		this._ensureObject(payload);
		const userPlaceId = user?.placeId ?? null;
		let resolvedPlaceId = payload.placeId;
		if (userPlaceId !== null && typeof userPlaceId !== "undefined") {
			const normalizedUserPlaceId = this._validateId(userPlaceId, "placeId");
			if (payload.placeId !== null && typeof payload.placeId !== "undefined") {
				const normalizedPayloadPlaceId = this._validateId(payload.placeId, "placeId");
				if (normalizedPayloadPlaceId !== normalizedUserPlaceId) {
					throw new ValidationError("placeId does not match cashier account");
				}
			}
			resolvedPlaceId = normalizedUserPlaceId;
		}

		const placeId = await this._validatePlaceId(resolvedPlaceId);
		const stationId = await this._validateStationId(payload.stationId, placeId);
		const shiftId = await this._validateShiftId(payload.shiftId, placeId);
		const userCashierId = user?.id ?? null;
		let cashierId;
		if (userCashierId !== null && typeof userCashierId !== "undefined") {
			const normalizedUserCashierId = this._validateId(userCashierId, "cashierId");
			if (payload.cashierId !== null && typeof payload.cashierId !== "undefined") {
				const normalizedPayloadCashierId = this._validateId(payload.cashierId, "cashierId");
				if (normalizedPayloadCashierId !== normalizedUserCashierId) {
					throw new ValidationError("cashierId does not match authenticated user");
				}
			}
			cashierId = normalizedUserCashierId;
		} else {
			cashierId = this._validateId(payload.cashierId, "cashierId");
		}
		const ipAddress = String(payload.ipAddress ?? "").trim();
		if (!ipAddress) throw new ValidationError("ipAddress is required");

		const data = { placeId, stationId, shiftId, cashierId, ipAddress, status: "open", closedAt: null };

		if (payload.openingBalance !== undefined) {
			data.openingBalance = normalizeNumber(payload.openingBalance, "openingBalance");
		}

		return this.cashierShiftService.create(data);
	}
}
