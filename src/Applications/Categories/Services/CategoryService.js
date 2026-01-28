import CategoryRepository from "../../../Domains/Categories/Repositories/CategoryRepository.js";

export default class CategoryService {
	constructor({ categoryRepository } = {}) {
		if (!categoryRepository) throw new Error("CATEGORY_SERVICE.MISSING_REPOSITORY");
		if (!(categoryRepository instanceof CategoryRepository)) {
			const methods = ["findAll", "findById", "findByName", "createCategory", "updateCategory", "deleteCategory"];
			const missing = methods.find((m) => typeof categoryRepository[m] !== "function");
			if (missing) throw new Error(`CATEGORY_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
		}
		this._repo = categoryRepository;
	}
	listCategories({ type } = {}) {
		return this._repo.findAll({ type });
	}
	getCategory(id) {
		return this._repo.findById(id);
	}
	getCategoryByName(name, type = null) {
		return this._repo.findByName(name, type);
	}
	createCategory(data) {
		return this._repo.createCategory(data);
	}
	updateCategory(payload) {
		return this._repo.updateCategory(payload);
	}
	deleteCategory(id) {
		return this._repo.deleteCategory(id);
	}
}
