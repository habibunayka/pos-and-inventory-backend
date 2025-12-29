export default class TransactionItemVariantPresenter {
	constructor({ menuVariantPresenter } = {}) {
		this.menuVariantPresenter = menuVariantPresenter ?? null;
	}

	present(record) {
		if (!record) return null;
		const menuVariant = this.menuVariantPresenter
			? this.menuVariantPresenter.present(record.menuVariant)
			: record.menuVariant ?? null;
		return {
			id: record.id,
			transactionItemId: record.transactionItemId,
			menuVariantId: record.menuVariantId,
			extraPrice: Number(record.extraPrice ?? 0),
			menuVariant
		};
	}

	presentCollection(records) {
		return records.map((r) => this.present(r));
	}
}
