export default class StationPresenter {
	present(record) {
		if (!record) return null;
		return {
			id: record.id,
			placeId: record.placeId,
			name: record.name,
			description: record.description ?? null,
			isActive: Boolean(record.isActive)
		};
	}

	presentCollection(records) {
		return records.map((record) => this.present(record));
	}
}
