import BaseTransactionUsecase from "../BaseTransactionUsecase.js";
import AppError from "../../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../../Commons/Constants/HttpStatus.js";

export default class GetTransactionUsecase extends BaseTransactionUsecase {
	constructor({ transactionService } = {}) {
		super();
		if (!transactionService) throw new Error("GET_TRANSACTION.MISSING_SERVICE");
		this.transactionService = transactionService;
	}
	async execute(id) {
		const intId = this._positiveInt(id, "id");
		const rec = await this.transactionService.getTransaction(intId);
		if (!rec) throw new AppError("Transaction not found", HttpStatus.NOT_FOUND);
		return rec;
	}
}
