export default class ShiftPresenter {
	present(record) {
		if (!record) return null;
		return {
			id: record.id,
			placeId: record.placeId ?? null,
			name: record.name,
			startTime: record.startTime,
			endTime: record.endTime,
			description: record.description ?? null,
			isActive: Boolean(record.isActive)
		};
	}

	presentCollection(records) {
		return records.map((record) => this.present(record));
	}
}
