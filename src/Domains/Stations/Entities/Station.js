export default class Station {
	constructor({ id = null, placeId, name, description = null, isActive = true }) {
		this.id = id;
		this.placeId = placeId;
		this.name = name;
		this.description = description;
		this.isActive = isActive;
	}

	static fromPersistence(record) {
		if (!record) return null;
		return new Station({
			id: record.id ?? null,
			placeId: record.placeId,
			name: record.name,
			description: record.description ?? null,
			isActive: record.isActive ?? true
		});
	}
}
