import BasePackageUsecase from "./BasePackageUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class DeletePackageUsecase extends BasePackageUsecase {
	async execute(id) {
		const numericId = Number(id);
		if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError("id must be a positive integer");
		const deleted = await this.packageService.deletePackage(numericId);
		if (!deleted) throw new ValidationError("Package not found");
		return true;
	}
}
