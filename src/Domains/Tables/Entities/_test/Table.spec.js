import { describe, expect, it } from "@jest/globals";
import Table from "../Table.js";

describe("Table", () => {
	it("returns null when record is missing", () => {
		expect(Table.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			placeId: "placeId-value-2",
			name: "name-value-3",
			status: "status-value-4"
		};

		const entity = Table.fromPersistence(record);

		expect(entity).toBeInstanceOf(Table);
		expect(entity).toMatchObject({
			id: "id-value-1",
			placeId: "placeId-value-2",
			name: "name-value-3",
			status: "status-value-4"
		});
	});
});
