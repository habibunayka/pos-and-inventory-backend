import { describe, expect, it } from "@jest/globals";
import TransactionItem from "../TransactionItem.js";

describe("TransactionItem", () => {
	it("returns null when record is missing", () => {
		expect(TransactionItem.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			transactionId: "transactionId-value-2",
			menuId: "menuId-value-3",
			qty: "qty-value-4",
			price: "price-value-5",
			discount: "discount-value-6"
		};

		const entity = TransactionItem.fromPersistence(record);

		expect(entity).toBeInstanceOf(TransactionItem);
		expect(entity).toMatchObject({
			id: "id-value-1",
			transactionId: "transactionId-value-2",
			menuId: "menuId-value-3",
			qty: "qty-value-4",
			price: "price-value-5",
			discount: "discount-value-6"
		});
	});
});
