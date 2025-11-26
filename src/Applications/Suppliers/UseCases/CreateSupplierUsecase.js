import BaseSupplierUsecase from "./BaseSupplierUsecase.js";

export default class CreateSupplierUsecase extends BaseSupplierUsecase {
	async execute(payload = {}) {
		const name = this._requireText(payload.name, "name");
		const data = {
			name,
			address: this._textOrNull(payload.address),
			phone: this._textOrNull(payload.phone),
			note: this._textOrNull(payload.note)
		};
		return this.supplierService.createSupplier(data);
	}
}
