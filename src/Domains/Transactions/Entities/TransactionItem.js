import Menu from "../../Menus/Entities/Menu.js";
import TransactionItemVariant from "./TransactionItemVariant.js";

export default class TransactionItem {
	constructor({
		id = null,
		transactionId,
		menuId,
		qty,
		price,
		discount = null,
		menu = null,
		variants = [],
		totalCost = null,
		costCalculatedAt = null
	}) {
		this.id = id;
		this.transactionId = transactionId;
		this.menuId = menuId;
		this.qty = qty;
		this.price = price;
		this.discount = discount;
		this.menu = menu;
		this.variants = variants;
		this.totalCost = totalCost;
		this.costCalculatedAt = costCalculatedAt;
	}

	static fromPersistence(record) {
		if (!record) return null;
		const cost = record.cost && !record.cost.deletedAt ? record.cost : null;
		return new TransactionItem({
			id: record.id ?? null,
			transactionId: record.transactionId,
			menuId: record.menuId,
			qty: record.qty,
			price: record.price,
			discount: record.discount ?? null,
			menu: Menu.fromPersistence(record.menu),
			variants: Array.isArray(record.variants)
				? record.variants.map((variant) => TransactionItemVariant.fromPersistence(variant))
				: [],
			totalCost: cost?.totalCost ?? null,
			costCalculatedAt: cost?.calculatedAt ?? null
		});
	}
}
