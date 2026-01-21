export default class TransactionItemPresenter {
	constructor({ menuPresenter, transactionItemVariantPresenter } = {}) {
		this.menuPresenter = menuPresenter ?? null;
		this.transactionItemVariantPresenter = transactionItemVariantPresenter ?? null;
	}

	present(record) {
		if (!record) return null;
		const menu = this.menuPresenter ? this.menuPresenter.present(record.menu) : record.menu ?? null;
		const variants = Array.isArray(record.variants) ? record.variants : [];
		const presentedVariants = this.transactionItemVariantPresenter
			? this.transactionItemVariantPresenter.presentCollection(variants)
			: variants;
		return {
			id: record.id,
			transactionId: record.transactionId,
			menuId: record.menuId,
			qty: record.qty,
			price: Number(record.price),
			discount: record.discount == null ? null : Number(record.discount),
			menu,
			variants: presentedVariants,
			totalCost: record.totalCost == null ? null : Number(record.totalCost),
			costCalculatedAt: record.costCalculatedAt ?? null
		};
	}

	presentCollection(records) {
		return records.map((r) => this.present(r));
	}
}
