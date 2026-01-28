export default class TransactionPresenter {
	constructor({ transactionItemPresenter } = {}) {
		this.transactionItemPresenter = transactionItemPresenter ?? null;
	}

	_formatTransactionCode(value) {
		if (value == null) return value;
		const raw = String(value).trim();
		if (raw === "") return raw;
		const digits = raw.replace(/[^0-9]/g, "");
		if (digits === "") return raw;
		const numberValue = Number(digits);
		if (!Number.isFinite(numberValue)) return raw;
		return `#TRX${numberValue}`;
	}

	present(record) {
		if (!record) return null;
		const items = Array.isArray(record.items) ? record.items : [];
		const presentedItems = this.transactionItemPresenter
			? this.transactionItemPresenter.presentCollection(items)
			: items;
		return {
			id: this._formatTransactionCode(record.id),
			cashierId: record.cashierId,
			placeId: record.placeId,
			tableId: record.tableId,
			orderType: record.orderType,
					 customerName: record.customerName,
					 status: record.status,
					 note: record.note ?? null,
					 voidReason: record.voidReason ?? null,
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
