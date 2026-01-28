import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class BaseIngredientCategoryUsecase {
	constructor({ ingredientCategoryService } = {}) {
		if (!ingredientCategoryService) throw new Error("INGREDIENT_CATEGORY_USECASE.MISSING_SERVICE");
		this.ingredientCategoryService = ingredientCategoryService;
	}
	_normalize(text) {
		return String(text ?? "")
			.trim()
			.toLowerCase();
	}
	async _assertNameAvailable(name, ignoreId = null) {
		const normalized = this._normalize(name);
		if (!normalized) throw new ValidationError("Ingredient category name is required");
		const existing = await this.ingredientCategoryService.getIngredientCategoryByName(normalized);
		if (existing && existing.id !== ignoreId) {
			throw new ValidationError(`Ingredient category ${normalized} already exists`);
		}
		return normalized;
	}
}
