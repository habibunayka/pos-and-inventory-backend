export default class MenuPresenter {
	present(model) {
		if (!model) return null;
		return {
			id: model.id,
			placeId: model.placeId ?? null,
			name: model.name,
			categoryId: model.categoryId ?? null,
			description: model.description ?? null,
			sku: model.sku ?? null,
			isActive: model.isActive,
			createdAt: model.createdAt
		};
	}
	presentCollection(records = []) {
		return records.map((r) => this.present(r));
	}
}
