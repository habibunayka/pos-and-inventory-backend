import BaseRecipeUsecase from "./BaseRecipeUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class CreateRecipeUsecase extends BaseRecipeUsecase {
	async execute(payload = {}) {
		const menuId = this._toInt(payload.menuId, "menuId");
		const ingredientId = this._toInt(payload.ingredientId, "ingredientId");
		const menuVariantItemId =
			payload.menuVariantItemId === undefined ? undefined : this._toInt(payload.menuVariantItemId, "menuVariantItemId");
		const qty = Number(payload.qty);
		if (!Number.isFinite(qty) || qty <= 0) throw new ValidationError("qty must be a positive number");
		const data = { menuId, ingredientId, qty };
		if (menuVariantItemId !== undefined) data.menuVariantItemId = menuVariantItemId;
		return this.recipeService.createRecipe(data);
	}
}
