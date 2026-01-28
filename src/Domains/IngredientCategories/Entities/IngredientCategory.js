export default class IngredientCategory {
	constructor({ id = null, name }) {
		this.id = id;
		this.name = name;
	}

	static fromPersistence(record) {
		if (!record) return null;
		return new IngredientCategory({
			id: record.id ?? null,
			name: record.name ?? null
		});
	}
}
