import BaseTransactionUsecase from "../BaseTransactionUsecase.js";
import AppError from "../../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../../Commons/Constants/HttpStatus.js";

export default class GetKitchenOrderUsecase extends BaseTransactionUsecase {
	constructor({ kitchenOrderService } = {}) {
		super();
		if (!kitchenOrderService) throw new Error("GET_KITCHEN_ORDER.MISSING_SERVICE");
		this.kitchenOrderService = kitchenOrderService;
	}
	async execute(id) {
		const intId = this._positiveInt(id, "id");
		const rec = await this.kitchenOrderService.getKitchenOrder(intId);
		if (!rec) throw new AppError("Kitchen order not found", HttpStatus.NOT_FOUND);
		return rec;
	}
}
