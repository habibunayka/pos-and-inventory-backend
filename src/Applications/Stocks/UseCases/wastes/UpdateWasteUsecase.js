import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class UpdateWasteUsecase {
	constructor({ wasteService } = {}) {
		if (!wasteService) throw new Error("UPDATE_WASTE.MISSING_SERVICE");
		this.wasteService = wasteService;
	}
	async execute(id, payload = {}) {
		const intId = Number(id);
		if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError("id must be a positive integer");
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new ValidationError("Payload must be an object");
		}

		const toPositiveInt = (value, field) => {
			const intVal = Number(value);
			if (!Number.isInteger(intVal) || intVal <= 0) {
				throw new ValidationError(`${field} must be a positive integer`);
			}
			return intVal;
		};

		const data = {};
		if (payload.ingredientId !== undefined) data.ingredientId = toPositiveInt(payload.ingredientId, "ingredientId");
		if (payload.unitId !== undefined) data.unitId = toPositiveInt(payload.unitId, "unitId");
		if (payload.placeId !== undefined) data.placeId = payload.placeId == null ? null : Number(payload.placeId);
		if (payload.qty !== undefined) {
			const qty = Number(payload.qty);
			if (!Number.isFinite(qty)) throw new ValidationError("qty must be a number");
			data.qty = qty;
		}
		if (payload.reason !== undefined) data.reason = String(payload.reason ?? "").trim();

		if (Object.keys(data).length === 0) {
			throw new ValidationError("No fields to update");
		}

		const rec = await this.wasteService.updateWaste({ id: intId, data });
		if (!rec) throw new ValidationError("Waste not found");
		return rec;
	}
}
