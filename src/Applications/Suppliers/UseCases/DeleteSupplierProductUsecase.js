import BaseSupplierProductUsecase from "./BaseSupplierProductUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class DeleteSupplierProductUsecase extends BaseSupplierProductUsecase {
	async execute(id) {
		const numericId = Number(id);
		if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError("Invalid id");
		const deleted = await this.supplierProductService.deleteSupplierProduct(numericId);
		if (!deleted) throw new ValidationError("Supplier product not found");
		return true;
	}
}
