import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class CreateStockTransferUsecase {
	constructor({ stockTransferService } = {}) {
		if (!stockTransferService) throw new Error("CREATE_STOCK_TRANSFER.MISSING_SERVICE");
		this.stockTransferService = stockTransferService;
	}
	async execute(payload = {}) {
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
		if (payload.fromPlaceId !== undefined) data.fromPlaceId = toPositiveInt(payload.fromPlaceId, "fromPlaceId");
		if (payload.toPlaceId !== undefined) data.toPlaceId = toPositiveInt(payload.toPlaceId, "toPlaceId");
		if (payload.ingredientId !== undefined) data.ingredientId = toPositiveInt(payload.ingredientId, "ingredientId");
		if (payload.unitId !== undefined) data.unitId = toPositiveInt(payload.unitId, "unitId");
		if (payload.qty !== undefined) {
			const qty = Number(payload.qty);
			if (!Number.isFinite(qty) || qty <= 0) throw new ValidationError("qty must be a number");
			data.qty = qty;
		}
		if (payload.note !== undefined) data.note = String(payload.note ?? "").trim() || null;

		return this.stockTransferService.createStockTransfer(data);
	}
}
