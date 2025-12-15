import ShiftRepository from "../../../Domains/Shifts/Repositories/ShiftRepository.js";

export default class ShiftService {
	constructor({ shiftRepository } = {}) {
		if (!shiftRepository) throw new Error("SHIFT_SERVICE.MISSING_REPOSITORY");
		if (!(shiftRepository instanceof ShiftRepository)) {
			const required = ["findAll", "findById", "createShift", "updateShift", "deleteShift"];
			const missing = required.find((method) => typeof shiftRepository[method] !== "function");
			if (missing) throw new Error(`SHIFT_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
		}

		this._shiftRepository = shiftRepository;
		this.supportsPlaceValidation = true;
	}

	listShifts() {
		return this._shiftRepository.findAll();
	}

	getShift(id) {
		return this._shiftRepository.findById(id);
	}

	createShift(data) {
		return this._shiftRepository.createShift(data);
	}

	updateShift(payload) {
		return this._shiftRepository.updateShift(payload);
	}

	deleteShift(id) {
		return this._shiftRepository.deleteShift(id);
	}
}
