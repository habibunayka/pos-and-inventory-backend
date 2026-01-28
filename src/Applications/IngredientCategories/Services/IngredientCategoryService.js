import IngredientCategoryRepository from "../../../Domains/IngredientCategories/Repositories/IngredientCategoryRepository.js";

export default class IngredientCategoryService {
	constructor({ ingredientCategoryRepository } = {}) {
		if (!ingredientCategoryRepository) throw new Error("INGREDIENT_CATEGORY_SERVICE.MISSING_REPOSITORY");
		if (!(ingredientCategoryRepository instanceof IngredientCategoryRepository)) {
			const methods = [
				"findAll",
				"findById",
				"findByName",
				"createIngredientCategory",
				"updateIngredientCategory",
				"deleteIngredientCategory"
			];
			const missing = methods.find((m) => typeof ingredientCategoryRepository[m] !== "function");
			if (missing) throw new Error(`INGREDIENT_CATEGORY_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
		}
		this._repo = ingredientCategoryRepository;
	}
	listIngredientCategories() {
		return this._repo.findAll();
	}
	getIngredientCategory(id) {
		return this._repo.findById(id);
	}
	getIngredientCategoryByName(name) {
		return this._repo.findByName(name);
	}
	createIngredientCategory(data) {
		return this._repo.createIngredientCategory(data);
	}
	updateIngredientCategory(payload) {
		return this._repo.updateIngredientCategory(payload);
	}
	deleteIngredientCategory(id) {
		return this._repo.deleteIngredientCategory(id);
	}
}
