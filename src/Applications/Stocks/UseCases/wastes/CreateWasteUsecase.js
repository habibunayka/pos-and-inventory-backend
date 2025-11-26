import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class CreateWasteUsecase {
	constructor({ wasteService } = {}) {
		if (!wasteService) throw new Error("CREATE_WASTE.MISSING_SERVICE");
		this.wasteService = wasteService;
	}
	async execute(payload = {}) {
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new ValidationError("Payload must be an object");
		}

		const ingredientId = Number(payload.ingredientId);
		if (!Number.isInteger(ingredientId) || ingredientId <= 0) {
			throw new ValidationError("ingredientId must be a positive integer");
		}

		const qty = Number(payload.qty);
		if (!Number.isFinite(qty)) {
			throw new ValidationError("qty must be a number");
		}

		const data = { ingredientId, qty };
		if (payload.unitId !== undefined) {
			const unitId = Number(payload.unitId);
			if (!Number.isInteger(unitId) || unitId <= 0) {
				throw new ValidationError("unitId must be a positive integer");
			}
			data.unitId = unitId;
		}
		if (payload.placeId !== undefined) data.placeId = payload.placeId == null ? null : Number(payload.placeId);
		if (payload.reason !== undefined) data.reason = String(payload.reason ?? "").trim();

		return this.wasteService.createWaste(data);
	}
}
