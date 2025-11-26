import BaseStationUsecase from "./BaseStationUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class CreateStationUsecase extends BaseStationUsecase {
	async execute(payload = {}) {
		this._ensureObject(payload);
		const placeId = await this._validatePlaceId(payload.placeId);
		const name = String(payload.name ?? "").trim();
		if (!name) throw new ValidationError("name is required");
		const data = {
			placeId,
			name,
			description: payload.description === undefined ? null : String(payload.description ?? "").trim() || null
		};
		if (payload.isActive !== undefined) data.isActive = Boolean(payload.isActive);
		return this.stationService.createStation(data);
	}
}
