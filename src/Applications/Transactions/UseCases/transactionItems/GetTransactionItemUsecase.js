import BaseTransactionUsecase from "../BaseTransactionUsecase.js";
import AppError from "../../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../../Commons/Constants/HttpStatus.js";

export default class GetTransactionItemUsecase extends BaseTransactionUsecase {
	constructor({ transactionItemService } = {}) {
		super();
		if (!transactionItemService) throw new Error("GET_TRANSACTION_ITEM.MISSING_SERVICE");
		this.transactionItemService = transactionItemService;
	}
	async execute(id) {
		const intId = this._positiveInt(id, "id");
		const rec = await this.transactionItemService.getItem(intId);
		if (!rec) throw new AppError("Transaction item not found", HttpStatus.NOT_FOUND);
		return rec;
	}
}
