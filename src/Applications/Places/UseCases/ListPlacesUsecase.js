import BasePlaceUsecase from "./BasePlaceUsecase.js";

export default class ListPlacesUsecase extends BasePlaceUsecase {
	async execute() {
		return this.placeService.listPlaces();
	}
}
