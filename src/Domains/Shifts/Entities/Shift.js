export default class Shift {
	constructor({ id = null, placeId, name, startTime, endTime, description = null, isActive = true }) {
		this.id = id;
		this.placeId = placeId;
		this.name = name;
		this.startTime = startTime;
		this.endTime = endTime;
		this.description = description;
		this.isActive = isActive;
	}

	static fromPersistence(record) {
		if (!record) return null;
		return new Shift({
			id: record.id ?? null,
			placeId: record.placeId,
			name: record.name,
			startTime: record.startTime,
			endTime: record.endTime,
			description: record.description ?? null,
			isActive: record.isActive ?? true
		});
	}
}
