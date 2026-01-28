import BaseIngredientCategoryUsecase from "./BaseIngredientCategoryUsecase.js";

export default class ListIngredientCategoriesUsecase extends BaseIngredientCategoryUsecase {
	execute() {
		return this.ingredientCategoryService.listIngredientCategories();
	}
}
