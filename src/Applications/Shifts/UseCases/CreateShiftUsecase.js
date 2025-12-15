import BaseShiftUsecase from "./BaseShiftUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class CreateShiftUsecase extends BaseShiftUsecase {
	async execute(payload = {}) {
		this._ensureObject(payload);
		const placeId = await this._validatePlaceId(payload.placeId);
		const name = String(payload.name ?? "").trim();
		if (!name) throw new ValidationError("name is required");
		const startTime = this._normalizeTime(payload.startTime, "startTime");
		const endTime = this._normalizeTime(payload.endTime, "endTime");
		this._validateTimeWindow(startTime, endTime);

		const data = {
			placeId,
			name,
			startTime,
			endTime
		};

		if (payload.description !== undefined) {
			data.description = String(payload.description ?? "").trim() || null;
		}

		if (payload.isActive !== undefined) {
			data.isActive = Boolean(payload.isActive);
		}

		return this.shiftService.createShift(data);
	}
}
