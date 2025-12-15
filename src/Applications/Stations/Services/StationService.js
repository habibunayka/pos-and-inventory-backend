import StationRepository from "../../../Domains/Stations/Repositories/StationRepository.js";

export default class StationService {
	constructor({ stationRepository } = {}) {
		if (!stationRepository) throw new Error("STATION_SERVICE.MISSING_REPOSITORY");
		if (!(stationRepository instanceof StationRepository)) {
			const required = ["findAll", "findById", "createStation", "updateStation", "deleteStation"];
			const missing = required.find((method) => typeof stationRepository[method] !== "function");
			if (missing) throw new Error(`STATION_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
		}

		this._stationRepository = stationRepository;
		this.supportsPlaceValidation = true;
	}

	listStations() {
		return this._stationRepository.findAll();
	}

	getStation(id) {
		return this._stationRepository.findById(id);
	}

	createStation(data) {
		return this._stationRepository.createStation(data);
	}

	updateStation(payload) {
		return this._stationRepository.updateStation(payload);
	}

	deleteStation(id) {
		return this._stationRepository.deleteStation(id);
	}
}
