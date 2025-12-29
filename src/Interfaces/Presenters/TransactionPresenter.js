export default class TransactionPresenter {
	constructor({ transactionItemPresenter } = {}) {
		this.transactionItemPresenter = transactionItemPresenter ?? null;
	}

	present(record) {
		if (!record) return null;
		const items = Array.isArray(record.items) ? record.items : [];
		const presentedItems = this.transactionItemPresenter
			? this.transactionItemPresenter.presentCollection(items)
			: items;
		return {
			id: record.id,
			cashierId: record.cashierId,
			placeId: record.placeId,
			tableId: record.tableId,
			orderType: record.orderType,
			customerName: record.customerName,
			status: record.status,
			items: presentedItems,
			total: Number(record.total),
			tax: record.tax == null ? null : Number(record.tax),
			discount: record.discount == null ? null : Number(record.discount),
			paymentMethodId: record.paymentMethodId,
			createdAt: record.createdAt
		};
	}

	presentCollection(records) {
		return records.map((r) => this.present(r));
	}
}
