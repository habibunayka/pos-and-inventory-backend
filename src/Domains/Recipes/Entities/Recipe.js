export default class Recipe {
	constructor({ id = null, menuId, ingredientId, qty, menuVariantItemId = null }) {
		this.id = id;
		this.menuId = menuId;
		this.menuVariantItemId = menuVariantItemId;
		this.ingredientId = ingredientId;
		this.qty = qty;
	}

	static fromPersistence(record) {
		if (!record) return null;
		return new Recipe({
			id: record.id ?? null,
			menuId: record.menuId,
			menuVariantItemId: record.menuVariantItemId ?? null,
			ingredientId: record.ingredientId,
			qty: record.qty
		});
	}
}
