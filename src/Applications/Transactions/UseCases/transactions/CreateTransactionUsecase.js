import BaseTransactionUsecase from "../BaseTransactionUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class CreateTransactionUsecase extends BaseTransactionUsecase {
	constructor({ transactionService } = {}) {
		super();
		if (!transactionService) throw new Error("CREATE_TRANSACTION.MISSING_SERVICE");
		this.transactionService = transactionService;
	}
	async execute(payload = {}) {
		this._ensureObject(payload);
		const data = {};
		if (payload.cashierId != null) data.cashierId = this._positiveInt(payload.cashierId, "cashierId");
		if (payload.placeId != null) data.placeId = Number(payload.placeId) || null;
		if (payload.tableId != null) data.tableId = Number(payload.tableId) || null;
		if (payload.orderType !== undefined) {
			data.orderType = payload.orderType === null ? null : String(payload.orderType).trim() || null;
		}
		if (payload.customerName !== undefined) {
			data.customerName = payload.customerName === null ? null : String(payload.customerName).trim() || null;
		}
		if (payload.status !== undefined) {
			data.status = payload.status === null ? null : String(payload.status).trim() || null;
		}
		if (payload.items !== undefined) {
			if (payload.items === null) {
				data.itemsJson = null;
			} else if (Array.isArray(payload.items)) {
				data.itemsJson = payload.items;
			} else {
				throw new ValidationError("items must be an array");
			}
		}
		if (payload.total != null) data.total = Number(payload.total);
		if (payload.tax !== undefined) data.tax = payload.tax == null ? null : Number(payload.tax);
		if (payload.discount !== undefined) data.discount = payload.discount == null ? null : Number(payload.discount);
		if (payload.paymentMethodId !== undefined) {
			data.paymentMethodId =
				payload.paymentMethodId == null ? null : this._positiveInt(payload.paymentMethodId, "paymentMethodId");
		}
		return this.transactionService.createTransaction(data);
	}
}
