import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class BaseStationUsecase {
	constructor({ stationService, placeService } = {}) {
		if (!stationService) throw new Error("STATION_USECASE.MISSING_SERVICE");
		this.stationService = stationService;
		this.placeService = placeService ?? null;
	}

	_ensureObject(payload) {
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new ValidationError("Payload must be an object");
		}
	}

	_positiveInt(value, fieldName) {
		const intVal = Number(value);
		if (!Number.isInteger(intVal) || intVal <= 0) {
			throw new ValidationError(`${fieldName} must be a positive integer`);
		}
		return intVal;
	}

	async _validatePlaceId(placeId) {
		const id = this._positiveInt(placeId, "placeId");
		if (!this.placeService || this.placeService.supportsPlaceValidation === false) return id;
		const place = await this.placeService.getPlace(id);
		if (!place) throw new ValidationError("placeId not found");
		return id;
	}
}

