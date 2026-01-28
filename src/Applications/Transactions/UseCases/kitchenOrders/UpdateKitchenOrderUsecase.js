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

export default class UpdateKitchenOrderUsecase extends BaseTransactionUsecase {
	constructor({ kitchenOrderService, transactionItemService, transactionService } = {}) {
		super();
		if (!kitchenOrderService) throw new Error("UPDATE_KITCHEN_ORDER.MISSING_SERVICE");
		if (!transactionItemService) throw new Error("UPDATE_KITCHEN_ORDER.MISSING_TRANSACTION_ITEM_SERVICE");
		if (!transactionService) throw new Error("UPDATE_KITCHEN_ORDER.MISSING_TRANSACTION_SERVICE");
		this.kitchenOrderService = kitchenOrderService;
		this.transactionItemService = transactionItemService;
		this.transactionService = transactionService;
	}
	async execute(id, payload = {}) {
		const intId = this._positiveInt(id, "id");
		this._ensureObject(payload);
		const data = {};
		if (payload.transactionItemId !== undefined)
			data.transactionItemId = this._positiveInt(payload.transactionItemId, "transactionItemId");
		if (payload.status !== undefined) {
			data.status = normalizeKitchenOrderStatus(payload.status);
		}
		if (payload.startedAt !== undefined) data.startedAt = payload.startedAt ? new Date(payload.startedAt) : null;
		if (payload.finishedAt !== undefined)
			data.finishedAt = payload.finishedAt ? new Date(payload.finishedAt) : null;
		if (payload.note !== undefined) data.note = payload.note == null ? null : String(payload.note).trim() || null;
		const updated = await this.kitchenOrderService.updateKitchenOrder({ id: intId, data });
		if (!updated) return updated;
		if (updated.status !== "done") return updated;

		const item = await this.transactionItemService.getItem(updated.transactionItemId);
		if (!item || !item.transactionId) return updated;

		const kitchenOrders = await this.kitchenOrderService.listKitchenOrdersByTransactionId(item.transactionId);
		if (!Array.isArray(kitchenOrders) || kitchenOrders.length === 0) return updated;

		const allDone = kitchenOrders.every((order) => order?.status === "done");
		if (allDone) {
			const transaction = await this.transactionService.getTransaction(item.transactionId);
			if (transaction?.status !== "done") {
				await this.transactionService.updateTransaction({
					id: item.transactionId,
					data: { status: "ready_to_pickup" }
				});
			}
		}

		return updated;
	}
}
