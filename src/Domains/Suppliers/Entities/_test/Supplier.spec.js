import { describe, expect, it } from "@jest/globals";
import Supplier from "../Supplier.js";

describe("Supplier", () => {
	it("returns null when record is missing", () => {
		expect(Supplier.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			name: "name-value-2",
			contactName: "contactName-value-3",
			phone: "phone-value-4",
			email: "email-value-5",
			address: "address-value-6"
		};

		const entity = Supplier.fromPersistence(record);

		expect(entity).toBeInstanceOf(Supplier);
		expect(entity).toMatchObject({
			id: "id-value-1",
			name: "name-value-2",
			contactName: "contactName-value-3",
			phone: "phone-value-4",
			email: "email-value-5",
			address: "address-value-6"
		});
	});

});
