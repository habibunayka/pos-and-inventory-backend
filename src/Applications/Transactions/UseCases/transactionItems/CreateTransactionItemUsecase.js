import BaseTransactionUsecase from "../BaseTransactionUsecase.js";

export default class CreateTransactionItemUsecase extends BaseTransactionUsecase {
	constructor({ transactionItemService } = {}) {
		super();
		if (!transactionItemService) throw new Error("CREATE_TRANSACTION_ITEM.MISSING_SERVICE");
		this.transactionItemService = transactionItemService;
	}
	async execute(payload = {}) {
		this._ensureObject(payload);
		const data = {
			transactionId: this._positiveInt(payload.transactionId, "transactionId"),
			menuId: this._positiveInt(payload.menuId, "menuId"),
			qty: this._positiveInt(payload.qty, "qty"),
			price: Number(payload.price)
		};
		if (payload.discount !== undefined) data.discount = payload.discount == null ? null : Number(payload.discount);
		if (payload.totalCost !== undefined) data.totalCost = payload.totalCost == null ? null : Number(payload.totalCost);
		return this.transactionItemService.createItem(data);
	}
}
