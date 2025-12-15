import { describe, expect, it } from "@jest/globals";
import Waste from "../Waste.js";

describe("Waste", () => {
	it("returns null when record is missing", () => {
		expect(Waste.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			ingredientId: "ingredientId-value-2",
			placeId: "placeId-value-3",
			qty: "qty-value-4",
			reason: "reason-value-5",
			createdAt: "createdAt-value-6"
		};

		const entity = Waste.fromPersistence(record);

		expect(entity).toBeInstanceOf(Waste);
		expect(entity).toMatchObject({
			id: "id-value-1",
			ingredientId: "ingredientId-value-2",
			placeId: "placeId-value-3",
			qty: "qty-value-4",
			reason: "reason-value-5",
			createdAt: "createdAt-value-6"
		});
	});

});
