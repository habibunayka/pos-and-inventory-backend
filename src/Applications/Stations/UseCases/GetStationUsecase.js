import BaseStationUsecase from "./BaseStationUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class GetStationUsecase extends BaseStationUsecase {
	async execute(id) {
		const stationId = this._positiveInt(id, "id");
		const station = await this.stationService.getStation(stationId);
		if (!station) throw new ValidationError("Station not found");
		return station;
	}
}
