import { describe, expect, it } from "@jest/globals";
import TransactionItemVariant from "../TransactionItemVariant.js";

describe("TransactionItemVariant", () => {
	it("returns null when record is missing", () => {
		expect(TransactionItemVariant.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			transactionItemId: "transactionItemId-value-2",
			menuVariantId: "menuVariantId-value-3",
			extraPrice: "extraPrice-value-4"
		};

		const entity = TransactionItemVariant.fromPersistence(record);

		expect(entity).toBeInstanceOf(TransactionItemVariant);
		expect(entity).toMatchObject({
			id: "id-value-1",
			transactionItemId: "transactionItemId-value-2",
			menuVariantId: "menuVariantId-value-3",
			extraPrice: "extraPrice-value-4"
		});
	});
});
