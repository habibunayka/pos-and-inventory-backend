import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class UpdateStockTransferUsecase {
	constructor({ stockTransferService } = {}) {
		if (!stockTransferService) throw new Error("UPDATE_STOCK_TRANSFER.MISSING_SERVICE");
		this.stockTransferService = stockTransferService;
	}

	async execute(id, payload = {}) {
		const intId = Number(id);
		if (!Number.isInteger(intId) || intId <= 0) {
			throw new ValidationError("id must be a positive integer");
		}

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
		if (Object.prototype.hasOwnProperty.call(payload, "fromPlaceId")) {
			data.fromPlaceId = toPositiveInt(payload.fromPlaceId, "fromPlaceId");
		}
		if (Object.prototype.hasOwnProperty.call(payload, "toPlaceId")) {
			data.toPlaceId = toPositiveInt(payload.toPlaceId, "toPlaceId");
		}
		if (Object.prototype.hasOwnProperty.call(payload, "ingredientId")) {
			data.ingredientId = toPositiveInt(payload.ingredientId, "ingredientId");
		}
		if (Object.prototype.hasOwnProperty.call(payload, "qty")) {
			const qty = Number(payload.qty);
			if (!Number.isFinite(qty)) throw new ValidationError("qty must be a number");
			data.qty = qty;
		}
		if (Object.prototype.hasOwnProperty.call(payload, "unitId")) {
			data.unitId = toPositiveInt(payload.unitId, "unitId");
		}
		if (Object.prototype.hasOwnProperty.call(payload, "note")) {
			data.note = String(payload.note ?? "").trim() || null;
		}

		if (Object.keys(data).length === 0) {
			throw new ValidationError("No valid fields to update");
		}

		const updated = await this.stockTransferService.updateStockTransfer({ id: intId, data });
		if (!updated) throw new ValidationError("Stock transfer not found");
		return updated;
	}
}
