export default class Ingredient {
	constructor({ id = null, name, unitId, categoryId = null }) {
		this.id = id;
		this.name = name;
		this.unitId = unitId;
		this.categoryId = categoryId;
	}

	static fromPersistence(record) {
		if (!record) return null;
		return new Ingredient({
			id: record.id ?? null,
			name: record.name,
			unitId: record.unitId,
			categoryId: record.categoryId ?? null
		});
	}
}
