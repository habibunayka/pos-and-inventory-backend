import MenuVariant from "../../MenuVariants/Entities/MenuVariant.js";

export default class TransactionItemVariant {
	constructor({ id = null, transactionItemId, menuVariantId, extraPrice, menuVariant = null }) {
		this.id = id;
		this.transactionItemId = transactionItemId;
		this.menuVariantId = menuVariantId;
		this.extraPrice = extraPrice;
		this.menuVariant = menuVariant;
	}

	static fromPersistence(record) {
		if (!record) return null;
		return new TransactionItemVariant({
			id: record.id ?? null,
			transactionItemId: record.transactionItemId,
			menuVariantId: record.menuVariantId,
			extraPrice: record.extraPrice,
			menuVariant: MenuVariant.fromPersistence(record.menuVariant)
		});
	}
}
