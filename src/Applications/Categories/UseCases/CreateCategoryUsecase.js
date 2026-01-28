import BaseCategoryUsecase from "./BaseCategoryUsecase.js";

export default class CreateCategoryUsecase extends BaseCategoryUsecase {
	async execute(payload = {}) {
		const type = this._normalizeType(payload?.type);
		const name = await this._assertNameAvailable(payload?.name, type);
		return this.categoryService.createCategory({ name, type });
	}
}
