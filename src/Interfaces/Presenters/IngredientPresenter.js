export default class IngredientPresenter {
	present(ingredient) {
		if (!ingredient) return null;
		return {
			id: ingredient.id,
			name: ingredient.name,
			sku: ingredient.sku ?? null,
			unitId: ingredient.unitId,
			categoryId: ingredient.categoryId ?? null
		};
	}

	presentCollection(records) {
		return records.map((r) => this.present(r));
	}
}
