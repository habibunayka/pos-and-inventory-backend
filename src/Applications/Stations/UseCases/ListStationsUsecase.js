import BaseStationUsecase from "./BaseStationUsecase.js";

export default class ListStationsUsecase extends BaseStationUsecase {
	async execute() {
		return this.stationService.listStations();
	}
}
