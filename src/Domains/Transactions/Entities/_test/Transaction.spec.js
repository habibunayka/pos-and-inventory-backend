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
			items: [
				{
					id: "item-id-1",
					transactionId: "transaction-id-1",
					menuId: "menu-id-1",
					qty: "qty-1",
					price: "price-1",
					discount: "discount-1",
					menu: {
						id: "menu-id-1",
						placeId: "place-id-1",
						name: "menu-name-1",
						categoryId: "category-id-1",
						description: "desc-1",
						isActive: false
					},
					variants: [
						{
							id: "variant-id-1",
							transactionItemId: "item-id-1",
							menuVariantId: "menu-variant-id-1",
							extraPrice: "extra-1",
							menuVariant: {
								id: "menu-variant-id-1",
								menuId: "menu-id-1",
								name: "Variant 1"
							}
						}
					]
				}
			],
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
			itemsSnapshot: [{ menuId: 1, qty: 2 }],
			items: [
				{
					id: "item-id-1",
					transactionId: "transaction-id-1",
					menuId: "menu-id-1",
					qty: "qty-1",
					price: "price-1",
					discount: "discount-1",
					menu: {
						id: "menu-id-1",
						placeId: "place-id-1",
						name: "menu-name-1",
						categoryId: "category-id-1",
						description: "desc-1",
						isActive: false
					},
					variants: [
						{
							id: "variant-id-1",
							transactionItemId: "item-id-1",
							menuVariantId: "menu-variant-id-1",
							extraPrice: "extra-1",
							menuVariant: {
								id: "menu-variant-id-1",
								menuId: "menu-id-1",
								name: "Variant 1"
							}
						}
					]
				}
			],
			total: "total-value-6",
			tax: "tax-value-7",
			discount: "discount-value-8",
			paymentMethodId: "paymentMethodId-value-9",
			createdAt: "createdAt-value-10"
		});
	});
});
