import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class BaseCategoryUsecase {
	constructor({ categoryService } = {}) {
		if (!categoryService) throw new Error("CATEGORY_USECASE.MISSING_SERVICE");
		this.categoryService = categoryService;
	}
	_normalize(text) {
		return String(text ?? "")
			.trim()
			.toLowerCase();
	}
	_normalizeType(type) {
		const normalized = this._normalize(type || "menu");
		if (normalized !== "menu" && normalized !== "ingredient") {
			throw new ValidationError("Category type must be menu or ingredient");
		}
		return normalized;
	}
	async _assertNameAvailable(name, type, ignoreId = null) {
		const normalized = this._normalize(name);
		if (!normalized) throw new ValidationError("Category name is required");
		const existing = await this.categoryService.getCategoryByName(normalized, type);
		if (existing && existing.id !== ignoreId) {
			throw new ValidationError(`Category ${normalized} already exists`);
		}
		return normalized;
	}
}
