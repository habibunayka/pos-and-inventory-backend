import { describe, expect, it } from "@jest/globals";
import KitchenOrder from "../KitchenOrder.js";
import Transaction from "../Transaction.js";
import TransactionItem from "../TransactionItem.js";
import TransactionItemVariant from "../TransactionItemVariant.js";

describe("Transactions entity branch coverage", () => {
	it.each([KitchenOrder, Transaction, TransactionItem, TransactionItemVariant])(
		"returns null when persistence record is missing for %p",
		(Entity) => {
			expect(Entity.fromPersistence(null)).toBeNull();
		}
	);

	it("Transaction falls back for optional fields", () => {
		const entity = Transaction.fromPersistence({
			cashierId: 1,
			total: 1000,
			createdAt: "2024-01-01"
		});

		expect(entity).toMatchObject({
			id: null,
			placeId: null,
			tableId: null,
			orderType: null,
			customerName: null,
			status: null,
			note: null,
			items: [],
			itemsSnapshot: null,
			tax: null,
			discount: null,
			paymentMethodId: null
		});
	});

	it("Transaction preserves provided optional values", () => {
		const entity = Transaction.fromPersistence({
			id: 2,
			cashierId: 9,
			placeId: 3,
			tableId: 4,
			orderType: "dine-in",
			customerName: "Budi",
			status: "paid",
			note: "split bill",
			itemsJson: [{ menuId: 1, qty: 2 }],
			total: 2000,
			tax: 100,
			discount: 50,
			paymentMethodId: 5,
			createdAt: "2024-01-02"
		});

		expect(entity).toMatchObject({
			id: 2,
			placeId: 3,
			tableId: 4,
			orderType: "dine-in",
			customerName: "Budi",
			status: "paid",
			note: "split bill",
			items: [],
			itemsSnapshot: [{ menuId: 1, qty: 2 }],
			tax: 100,
			discount: 50,
			paymentMethodId: 5
		});
	});

	it("KitchenOrder uses nullable fields when absent", () => {
		const entity = KitchenOrder.fromPersistence({ transactionItemId: 1, status: "new" });
		expect(entity).toMatchObject({ id: null, startedAt: null, finishedAt: null, note: null });
	});

	it("TransactionItem nulls optionals", () => {
		const entity = TransactionItem.fromPersistence({ transactionId: 1, menuId: 2, qty: 1, price: 100 });
		expect(entity).toMatchObject({ id: null, discount: null, menu: null, variants: [], totalCost: null, costCalculatedAt: null });
	});

	it("TransactionItemVariant nulls note", () => {
		const entity = TransactionItemVariant.fromPersistence({ transactionItemId: 1, menuVariantId: 2 });
		expect(entity).toMatchObject({ id: null, extraPrice: undefined, menuVariant: null });
	});

	describe("constructor default branches", () => {
		const cases = [
			{
				Entity: Transaction,
				props: { cashierId: 1, total: 100, createdAt: "now" },
				expected: {
					placeId: null,
					discount: null,
					customerName: null,
					status: null,
					note: null,
					items: [],
					itemsSnapshot: null
				}
			},
			{
				Entity: KitchenOrder,
				props: { transactionItemId: 1, status: "new" },
				expected: { startedAt: null, finishedAt: null, note: null }
			},
			{
				Entity: TransactionItem,
				props: { transactionId: 1, menuId: 2, qty: 1, price: 10 },
				expected: { discount: null, menu: null, variants: [], totalCost: null, costCalculatedAt: null }
			},
			{
				Entity: TransactionItemVariant,
				props: { transactionItemId: 1, menuVariantId: 2, extraPrice: 1 },
				expected: { id: null, menuVariant: null }
			}
		];

		it.each(cases)("applies defaults for %p", ({ Entity, props, expected }) => {
			const entity = new Entity(props);
			expect(entity).toBeInstanceOf(Entity);
			expect(entity).toMatchObject(expected);
		});
	});
});
