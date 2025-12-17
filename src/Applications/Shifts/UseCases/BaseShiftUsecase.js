import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class BaseShiftUsecase {
	constructor({ shiftService, placeService } = {}) {
		if (!shiftService) throw new Error("SHIFT_USECASE.MISSING_SERVICE");
		this.shiftService = shiftService;
		this.placeService = placeService ?? null;
	}

	_ensureObject(payload) {
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new ValidationError("Payload must be an object");
		}
	}

	_toInt(value, fieldName = "id") {
		return this._positiveInt(value, fieldName);
	}

	_positiveInt(value, fieldName) {
		const intVal = Number(value);
		if (!Number.isInteger(intVal) || intVal <= 0)
			throw new ValidationError(`${fieldName} must be a positive integer`);
		return intVal;
	}

	async _validatePlaceId(placeId, { allowNull = false } = {}) {
		if (placeId == null) {
			if (allowNull) return null;
			throw new ValidationError("placeId is required");
		}
		const id = this._positiveInt(placeId, "placeId");
		if (!this.placeService || this.placeService.supportsPlaceValidation === false) return id;
		const place = await this.placeService.getPlace(id);
		if (!place) throw new ValidationError("placeId not found");
		return id;
	}

	_normalizeTime(time, fieldName) {
		if (typeof time !== "string") {
			throw new ValidationError(`${fieldName} must be a string`);
		}
		const value = String(time ?? "").trim();
		if (!value) throw new ValidationError(`${fieldName} is required`);
		const timePattern = /^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;
		if (!timePattern.test(value)) {
			throw new ValidationError(`${fieldName} must match HH:mm or HH:mm:ss`);
		}
		return value;
	}

	_timeToMinutes(value) {
		const [hour, minute, second = "0"] = value.split(":").map((part) => Number(part));
		return hour * 60 + minute + Math.floor(second / 60);
	}

	_validateTimeWindow(startTime, endTime) {
		const startMinutes = this._timeToMinutes(startTime);
		const endMinutes = this._timeToMinutes(endTime);
		if (startMinutes === endMinutes) {
			throw new ValidationError("endTime must be different from startTime");
		}
	}
}
