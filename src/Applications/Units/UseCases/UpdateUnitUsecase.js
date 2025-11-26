import BaseUnitUsecase from "./BaseUnitUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class UpdateUnitUsecase extends BaseUnitUsecase {
	async execute(id, payload = {}) {
		const numericId = Number(id);
		if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError("id must be a positive integer");
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new ValidationError("Payload must be an object");
		}

		const update = {};
		if (Object.prototype.hasOwnProperty.call(payload, "name")) {
			update.name = await this._assertNameAvailable(payload.name, numericId);
		}
		if (Object.prototype.hasOwnProperty.call(payload, "abbreviation")) {
			const abv = String(payload.abbreviation ?? "")
				.trim()
				.toLowerCase();
			if (!abv) throw new ValidationError("abbreviation cannot be empty");
			update.abbreviation = abv;
		}
		if (Object.keys(update).length === 0) throw new ValidationError("No valid fields to update");

		const updated = await this.unitService.updateUnit({ id: numericId, data: update });
		if (!updated) throw new ValidationError("Unit not found");
		return updated;
	}
}
