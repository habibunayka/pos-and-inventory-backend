import { describe, expect, it } from "@jest/globals";
import KitchenOrder from "../KitchenOrder.js";

describe("KitchenOrder", () => {
	it("returns null when record is missing", () => {
		expect(KitchenOrder.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			transactionItemId: "transactionItemId-value-2",
			status: "status-value-3",
			startedAt: "startedAt-value-4",
			finishedAt: "finishedAt-value-5",
			note: "note-value-6"
		};

		const entity = KitchenOrder.fromPersistence(record);

		expect(entity).toBeInstanceOf(KitchenOrder);
		expect(entity).toMatchObject({
			id: "id-value-1",
			transactionItemId: "transactionItemId-value-2",
			status: "status-value-3",
			startedAt: "startedAt-value-4",
			finishedAt: "finishedAt-value-5",
			note: "note-value-6"
		});
	});

});
