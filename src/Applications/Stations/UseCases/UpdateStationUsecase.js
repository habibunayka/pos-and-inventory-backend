import BaseStationUsecase from "./BaseStationUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class UpdateStationUsecase extends BaseStationUsecase {
	async execute(id, payload = {}) {
		const stationId = this._positiveInt(id, "id");
		this._ensureObject(payload);
		const existing = await this.stationService.getStation(stationId);
		if (!existing) throw new ValidationError("Station not found");

		const data = {};
		if (Object.prototype.hasOwnProperty.call(payload, "placeId")) {
			data.placeId = await this._validatePlaceId(payload.placeId);
		}
		if (Object.prototype.hasOwnProperty.call(payload, "name")) {
			const name = String(payload.name ?? "").trim();
			if (!name) throw new ValidationError("name cannot be empty");
			data.name = name;
		}
		if (Object.prototype.hasOwnProperty.call(payload, "description")) {
			data.description = payload.description === null ? null : String(payload.description ?? "").trim() || null;
		}
		if (Object.prototype.hasOwnProperty.call(payload, "isActive")) {
			data.isActive = Boolean(payload.isActive);
		}

		if (Object.keys(data).length === 0) throw new ValidationError("No updatable fields provided");

		const updated = await this.stationService.updateStation({ id: stationId, data });
		if (!updated) throw new ValidationError("Station not found");
		return updated;
	}
}
