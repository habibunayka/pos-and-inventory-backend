import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class BaseCashierShiftUsecase {
	constructor({ cashierShiftService, placeService, stationService, shiftService } = {}) {
		if (!cashierShiftService) throw new Error("CASHIER_SHIFT_USECASE.MISSING_SERVICE");
		this.cashierShiftService = cashierShiftService;
		this.placeService = placeService ?? null;
		this.stationService = stationService ?? null;
		this.shiftService = shiftService ?? null;
	}

	_ensureObject(payload) {
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new ValidationError("Payload must be an object");
		}
	}

	_validateId(value, fieldName = "id") {
		const intVal = Number(value);
		if (!Number.isInteger(intVal) || intVal <= 0) {
			throw new ValidationError(`${fieldName} must be a positive integer`);
		}
		return intVal;
	}

	async _validatePlaceId(placeId) {
		const id = this._validateId(placeId, "placeId");
		if (!this.placeService || this.placeService.supportsPlaceValidation === false) return id;
		const place = await this.placeService.getPlace(id);
		if (!place) throw new ValidationError("placeId not found");
		return id;
	}

	async _validateStationId(stationId, placeId = null) {
		const id = this._validateId(stationId, "stationId");
		if (!this.stationService) return id;
		const station = await this.stationService.getStation(id);
		if (!station) throw new ValidationError("stationId not found");
		if (placeId && station.placeId !== placeId) {
			throw new ValidationError("stationId does not belong to placeId");
		}
		return id;
	}

	async _validateShiftId(shiftId, placeId = null) {
		const id = this._validateId(shiftId, "shiftId");
		if (!this.shiftService) return id;
		const shift = await this.shiftService.getShift(id);
		if (!shift) throw new ValidationError("shiftId not found");
		if (placeId && shift.placeId && shift.placeId !== placeId) {
			throw new ValidationError("shiftId does not belong to placeId");
		}
		return id;
	}
}

