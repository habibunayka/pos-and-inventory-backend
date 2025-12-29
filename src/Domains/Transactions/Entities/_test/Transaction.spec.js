import { describe, expect, it } from "@jest/globals";
import Transaction from "../Transaction.js";

describe("Transaction", () => {
	it("returns null when record is missing", () => {
		expect(Transaction.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			cashierId: "cashierId-value-2",
			placeId: "placeId-value-3",
			tableId: "tableId-value-4",
			orderType: "orderType-value-5",
			customerName: "customerName-value-6",
			status: "status-value-7",
			itemsJson: [{ menuId: 1, qty: 2 }],
			total: "total-value-6",
			tax: "tax-value-7",
			discount: "discount-value-8",
			paymentMethodId: "paymentMethodId-value-9",
			createdAt: "createdAt-value-10"
		};

		const entity = Transaction.fromPersistence(record);

		expect(entity).toBeInstanceOf(Transaction);
		expect(entity).toMatchObject({
			id: "id-value-1",
			cashierId: "cashierId-value-2",
			placeId: "placeId-value-3",
			tableId: "tableId-value-4",
			orderType: "orderType-value-5",
			customerName: "customerName-value-6",
			status: "status-value-7",
			items: [{ menuId: 1, qty: 2 }],
			total: "total-value-6",
			tax: "tax-value-7",
			discount: "discount-value-8",
			paymentMethodId: "paymentMethodId-value-9",
			createdAt: "createdAt-value-10"
		});
	});
});
