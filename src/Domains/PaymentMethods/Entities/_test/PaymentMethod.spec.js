import { describe, expect, it } from "@jest/globals";
import PaymentMethod from "../PaymentMethod.js";

describe("PaymentMethod", () => {
	it("returns null when record is missing", () => {
		expect(PaymentMethod.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			name: "name-value-2",
			description: "description-value-3",
			isActive: "isActive-value-4"
		};

		const entity = PaymentMethod.fromPersistence(record);

		expect(entity).toBeInstanceOf(PaymentMethod);
		expect(entity).toMatchObject({
			id: "id-value-1",
			name: "name-value-2",
			description: "description-value-3",
			isActive: "isActive-value-4"
		});
	});

});
