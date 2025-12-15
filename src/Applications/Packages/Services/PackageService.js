import PackageRepository from "../../../Domains/Packages/Repositories/PackageRepository.js";

export default class PackageService {
	constructor({ packageRepository } = {}) {
		if (!packageRepository) throw new Error("PACKAGE_SERVICE.MISSING_REPOSITORY");
		if (!(packageRepository instanceof PackageRepository)) {
			const methods = ["findAll", "findById", "createPackage", "updatePackage", "deletePackage"];
			const missing = methods.find((m) => typeof packageRepository[m] !== "function");
			if (missing) throw new Error(`PACKAGE_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
		}
		this._packageRepository = packageRepository;
	}

	listPackages() {
		return this._packageRepository.findAll();
	}
	getPackage(id) {
		return this._packageRepository.findById(id);
	}
	getPackageByName(name) {
		if (typeof this._packageRepository.findByName !== "function") {
			throw new Error("PACKAGE_SERVICE.REPOSITORY_MISSING_FIND_BY_NAME");
		}
		return this._packageRepository.findByName(name);
	}
	createPackage(packageData) {
		return this._packageRepository.createPackage(packageData);
	}
	updatePackage(payload) {
		return this._packageRepository.updatePackage(payload);
	}
	deletePackage(id) {
		return this._packageRepository.deletePackage(id);
	}
}
