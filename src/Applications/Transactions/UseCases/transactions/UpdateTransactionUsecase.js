import BaseTransactionUsecase from "../BaseTransactionUsecase.js";
import AppError from "../../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../../Commons/Constants/HttpStatus.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class UpdateTransactionUsecase extends BaseTransactionUsecase {
	constructor({ transactionService } = {}) {
		super();
		if (!transactionService) throw new Error("UPDATE_TRANSACTION.MISSING_SERVICE");
		this.transactionService = transactionService;
	}
	async execute(id, payload = {}) {
		const intId = this._positiveInt(id, "id");
		this._ensureObject(payload);
		const data = {};
		if (payload.cashierId != null) data.cashierId = this._positiveInt(payload.cashierId, "cashierId");
		if (payload.placeId !== undefined) data.placeId = payload.placeId == null ? null : Number(payload.placeId);
		if (payload.tableId !== undefined) data.tableId = payload.tableId == null ? null : Number(payload.tableId);
		if (payload.orderType !== undefined) {
			data.orderType = payload.orderType == null ? null : String(payload.orderType).trim() || null;
		}
		if (payload.customerName !== undefined) {
			data.customerName = payload.customerName === null ? null : String(payload.customerName).trim() || null;
		}
		if (payload.status !== undefined) {
			data.status = payload.status == null ? null : String(payload.status).trim() || null;
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
		if (payload.total !== undefined) data.total = Number(payload.total);
		if (payload.tax !== undefined) data.tax = payload.tax == null ? null : Number(payload.tax);
		if (payload.discount !== undefined) data.discount = payload.discount == null ? null : Number(payload.discount);
		if (payload.paymentMethodId !== undefined) {
			data.paymentMethodId =
				payload.paymentMethodId == null ? null : this._positiveInt(payload.paymentMethodId, "paymentMethodId");
		}
		const updated = await this.transactionService.updateTransaction({ id: intId, data });
		if (!updated) {
			throw new AppError("Transaction not found", HttpStatus.NOT_FOUND);
		}
		return updated;
	}
}
