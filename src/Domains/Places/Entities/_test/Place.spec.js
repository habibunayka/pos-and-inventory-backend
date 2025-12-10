import { describe, expect, it } from "@jest/globals";
import Place from "../Place.js";

describe("Place", () => {
	it("returns null when record is missing", () => {
		expect(Place.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			name: "name-value-2",
			address: "address-value-3",
			phone: "phone-value-4",
			logoPath: "logoPath-value-5",
			type: "type-value-6",
			isActive: "isActive-value-7"
		};

		const entity = Place.fromPersistence(record);

		expect(entity).toBeInstanceOf(Place);
		expect(entity).toMatchObject({
			id: "id-value-1",
			name: "name-value-2",
			address: "address-value-3",
			phone: "phone-value-4",
			logoPath: "logoPath-value-5",
			type: "type-value-6",
			isActive: "isActive-value-7"
		});
	});

});
