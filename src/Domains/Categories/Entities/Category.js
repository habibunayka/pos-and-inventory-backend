export default class Category {
	constructor({ id = null, name, type = "menu" }) {
		this.id = id;
		this.name = name;
		this.type = type;
	}

	static fromPersistence(record) {
		if (!record) return null;
		return new Category({
			id: record.id ?? null,
			name: record.name ?? null,
			type: record.type ?? "menu"
		});
	}
}
