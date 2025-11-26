import BasePackageUsecase from "./BasePackageUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class GetPackageUsecase extends BasePackageUsecase {
	async execute(id) {
		const numericId = Number(id);
		if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError("id must be a positive integer");
		const record = await this.packageService.getPackage(numericId);
		if (!record) throw new ValidationError("Package not found");
		return record;
	}
}
