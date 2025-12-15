import BaseStationUsecase from "./BaseStationUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class DeleteStationUsecase extends BaseStationUsecase {
	async execute(id) {
		const stationId = this._positiveInt(id, "id");
		const deleted = await this.stationService.deleteStation(stationId);
		if (!deleted) throw new ValidationError("Station not found");
		return true;
	}
}
