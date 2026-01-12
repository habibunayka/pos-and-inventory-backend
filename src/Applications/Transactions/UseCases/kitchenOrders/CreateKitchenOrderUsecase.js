import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BaseTransactionUsecase from "../BaseTransactionUsecase.js";

const VALID_KITCHEN_ORDER_STATUSES = new Set(["queued", "proses", "done"]);

function normalizeKitchenOrderStatus(value) {
	if (value == null) {
		return "queued";
	}

	const normalized = String(value).trim();
	if (!normalized) {
		return "queued";
	}

	if (!VALID_KITCHEN_ORDER_STATUSES.has(normalized)) {
		throw new ValidationError(`status must be one of: ${Array.from(VALID_KITCHEN_ORDER_STATUSES).join(", ")}`);
	}

	return normalized;
}

export default class CreateKitchenOrderUsecase extends BaseTransactionUsecase {
	constructor({ kitchenOrderService } = {}) {
		super();
		if (!kitchenOrderService) throw new Error("CREATE_KITCHEN_ORDER.MISSING_SERVICE");
		this.kitchenOrderService = kitchenOrderService;
	}
	async execute(payload = {}) {
		this._ensureObject(payload);
		const data = { transactionItemId: this._positiveInt(payload.transactionItemId, "transactionItemId") };
		if (payload.status !== undefined) {
			data.status = normalizeKitchenOrderStatus(payload.status);
		}
		if (payload.startedAt !== undefined) data.startedAt = payload.startedAt ? new Date(payload.startedAt) : null;
		if (payload.finishedAt !== undefined)
			data.finishedAt = payload.finishedAt ? new Date(payload.finishedAt) : null;
		if (payload.note !== undefined) data.note = payload.note == null ? null : String(payload.note).trim() || null;
		return this.kitchenOrderService.createKitchenOrder(data);
	}
}
