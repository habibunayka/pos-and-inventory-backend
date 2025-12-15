import { describe, expect, it } from "@jest/globals";
import Station from "../Station.js";

describe("Station", () => {
	it("returns null when record is missing", () => {
		expect(Station.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			placeId: "placeId-value-2",
			name: "name-value-3",
			description: "description-value-4",
			isActive: "isActive-value-5"
		};

		const entity = Station.fromPersistence(record);

		expect(entity).toBeInstanceOf(Station);
		expect(entity).toMatchObject({
			id: "id-value-1",
			placeId: "placeId-value-2",
			name: "name-value-3",
			description: "description-value-4",
			isActive: "isActive-value-5"
		});
	});

});
