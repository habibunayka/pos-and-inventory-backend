import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../../Commons/Constants/HttpStatus.js";

export default class UpdatePlaceStockUsecase {
	constructor({ placeStockService } = {}) {
		if (!placeStockService) throw new Error("UPDATE_PLACESTOCK.MISSING_SERVICE");
		this.placeStockService = placeStockService;
	}
	async execute(id, payload = {}) {
		const intId = Number(id);
		if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError("id must be positive integer");
		if (typeof payload !== "object" || payload === null || Array.isArray(payload))
			throw new ValidationError("Payload must be an object");
		const data = {};
		if (payload.placeId !== undefined) data.placeId = Number(payload.placeId);
		if (payload.ingredientId !== undefined) data.ingredientId = Number(payload.ingredientId);
		if (payload.qty !== undefined) data.qty = Number(payload.qty);
		if (payload.unitId !== undefined) data.unitId = Number(payload.unitId);
		const updated = await this.placeStockService.updatePlaceStock({ id: intId, data });
		if (!updated) {
			throw new AppError("Place stock not found", HttpStatus.NOT_FOUND);
		}
		return updated;
	}
}
