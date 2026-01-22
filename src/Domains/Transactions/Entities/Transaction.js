import TransactionItem from "./TransactionItem.js";

export default class Transaction {
	constructor({
		id = null,
		cashierId,
		placeId = null,
		tableId = null,
		orderType = null,
		customerName = null,
		status = null,
		note = null,
		voidReason = null,
		items = [],
		itemsSnapshot = null,
		total,
		tax = null,
		discount = null,
		paymentMethodId = null,
		createdAt
	}) {
		this.id = id;
		this.cashierId = cashierId;
		this.placeId = placeId;
		this.tableId = tableId;
		this.orderType = orderType;
		this.customerName = customerName;
		this.status = status;
		this.note = note;
		this.voidReason = voidReason;
		this.items = items;
		this.itemsSnapshot = itemsSnapshot;
		this.total = total;
		this.tax = tax;
		this.discount = discount;
		this.paymentMethodId = paymentMethodId;
		this.createdAt = createdAt;
	}

	static fromPersistence(record) {
		if (!record) return null;
		return new Transaction({
			id: record.id ?? null,
			cashierId: record.cashierId,
			placeId: record.placeId ?? null,
			tableId: record.tableId ?? null,
					 orderType: record.orderType ?? null,
					 customerName: record.customerName ?? null,
					 status: record.status ?? null,
					 note: record.note ?? null,
					 voidReason: record.voidReason ?? null,
					 items: Array.isArray(record.items)
							? record.items.map((item) => TransactionItem.fromPersistence(item))
							: [],
					 itemsSnapshot: record.itemsJson ?? null,
					 total: record.total,
			tax: record.tax ?? null,
			discount: record.discount ?? null,
			paymentMethodId: record.paymentMethodId ?? null,
			createdAt: record.createdAt
		});
	}
}
