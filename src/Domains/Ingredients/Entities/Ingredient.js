export default class Ingredient {
	constructor({ id = null, name, sku = null, unitId, categoryId = null }) {
		this.id = id;
		this.name = name;
		this.sku = sku;
		this.unitId = unitId;
		this.categoryId = categoryId;
	}

	static fromPersistence(record) {
		if (!record) return null;
		return new Ingredient({
			id: record.id ?? null,
			name: record.name,
			sku: record.sku ?? null,
			unitId: record.unitId,
			categoryId: record.categoryId ?? null
		});
	}
}
