import BasePackageUsecase from "./BasePackageUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class UpdatePackageUsecase extends BasePackageUsecase {
	async execute(id, payload = {}) {
		const numericId = Number(id);
		if (!Number.isInteger(numericId) || numericId <= 0) {
			throw new ValidationError("id must be a positive integer");
		}

		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new ValidationError("Payload must be an object");
		}

		const update = {};
		if (Object.prototype.hasOwnProperty.call(payload, "name")) {
			update.name = await this._assertNameAvailable(payload.name, numericId);
		}
		if (Object.prototype.hasOwnProperty.call(payload, "description")) {
			update.description = payload.description === null ? null : String(payload.description).trim() || null;
		}
		if (Object.keys(update).length === 0) {
			throw new ValidationError("No valid fields to update");
		}

		const updated = await this.packageService.updatePackage({ id: numericId, data: update });
		if (!updated) throw new ValidationError("Package not found");
		return updated;
	}
}
