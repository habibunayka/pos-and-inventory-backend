import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class UpdateInventoryStockDailyUsecase {
	constructor({ inventoryStockDailyService } = {}) {
		if (!inventoryStockDailyService) throw new Error("UPDATE_ISD.MISSING_SERVICE");
		this.inventoryStockDailyService = inventoryStockDailyService;
	}
	async execute(id, payload = {}) {
		const intId = Number(id);
		if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError("id must be positive integer");
		if (typeof payload !== "object" || payload === null || Array.isArray(payload))
			throw new ValidationError("Payload must be an object");
		const data = {};
		if (payload.placeId !== undefined) data.placeId = Number(payload.placeId);
		if (payload.ingredientId !== undefined) data.ingredientId = Number(payload.ingredientId);
		if (payload.date !== undefined) data.date = payload.date ? new Date(payload.date) : null;
		if (payload.openingQty !== undefined) {
			const val = Number(payload.openingQty);
			if (!Number.isFinite(val)) throw new ValidationError("openingQty must be a number");
			data.openingQty = val;
		}
		if (payload.closingQty !== undefined) {
			const val = Number(payload.closingQty);
			if (!Number.isFinite(val)) throw new ValidationError("closingQty must be a number");
			data.closingQty = val;
		}
		if (payload.diffQty !== undefined) {
			if (payload.diffQty == null) {
				data.diffQty = null;
			} else {
				const val = Number(payload.diffQty);
				if (!Number.isFinite(val)) throw new ValidationError("diffQty must be a number");
				data.diffQty = val;
			}
		}

		if (Object.keys(data).length === 0) throw new ValidationError("No fields to update");
		const updated = await this.inventoryStockDailyService.update({ id: intId, data });
		if (!updated) throw new ValidationError("Inventory stock daily not found");
		return updated;
	}
}
