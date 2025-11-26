import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class GetStockTransferUsecase {
	constructor({ stockTransferService } = {}) {
		if (!stockTransferService) throw new Error("GET_STOCK_TRANSFER.MISSING_SERVICE");
		this.stockTransferService = stockTransferService;
	}
	async execute(id) {
		const intId = Number(id);
		if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError("id must be a positive integer");
		const rec = await this.stockTransferService.getStockTransfer(intId);
		if (!rec) throw new ValidationError("Stock transfer not found");
		return rec;
	}
}
