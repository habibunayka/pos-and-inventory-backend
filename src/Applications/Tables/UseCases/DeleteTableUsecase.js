import BaseTableUsecase from "./BaseTableUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class DeleteTableUsecase extends BaseTableUsecase {
	async execute(id) {
		const numericId = Number(id);
		if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError("Invalid id");
		const deleted = await this.tableService.deleteTable(numericId);
		if (!deleted) throw new ValidationError("Table not found");
		return true;
	}
}
