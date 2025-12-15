import BaseShiftUsecase from "./BaseShiftUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class UpdateShiftUsecase extends BaseShiftUsecase {
	async execute(id, payload = {}) {
		const shiftId = Number(id);
		if (!Number.isInteger(shiftId) || shiftId <= 0) throw new ValidationError("Invalid id");
		this._ensureObject(payload);

		const existing = await this.shiftService.getShift(shiftId);
		if (!existing) throw new ValidationError("Shift not found");

		const data = {};
		if (Object.prototype.hasOwnProperty.call(payload, "placeId")) {
			data.placeId = await this._validatePlaceId(payload.placeId);
		}
		if (Object.prototype.hasOwnProperty.call(payload, "name")) {
			const name = String(payload.name ?? "").trim();
			if (!name) throw new ValidationError("name cannot be empty");
			data.name = name;
		}
		if (Object.prototype.hasOwnProperty.call(payload, "startTime")) {
			data.startTime = this._normalizeTime(payload.startTime, "startTime");
		}
		if (Object.prototype.hasOwnProperty.call(payload, "endTime")) {
			data.endTime = this._normalizeTime(payload.endTime, "endTime");
		}
		if (Object.prototype.hasOwnProperty.call(payload, "description")) {
			data.description = payload.description === null ? null : String(payload.description ?? "").trim() || null;
		}
		if (Object.prototype.hasOwnProperty.call(payload, "isActive")) {
			data.isActive = Boolean(payload.isActive);
		}

		if (Object.keys(data).length === 0) {
			throw new ValidationError("No updatable fields provided");
		}

		const effectiveStart = data.startTime ?? existing.startTime;
		const effectiveEnd = data.endTime ?? existing.endTime;
		this._validateTimeWindow(effectiveStart, effectiveEnd);

		const updated = await this.shiftService.updateShift({ id: shiftId, data });
		if (!updated) throw new ValidationError("Shift not found");
		return updated;
	}
}
