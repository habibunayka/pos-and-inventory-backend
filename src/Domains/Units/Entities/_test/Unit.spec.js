import { describe, expect, it } from "@jest/globals";
import Unit from "../Unit.js";

describe("Unit", () => {
	it("returns null when record is missing", () => {
		expect(Unit.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			name: "name-value-2",
			abbreviation: "abbreviation-value-3"
		};

		const entity = Unit.fromPersistence(record);

		expect(entity).toBeInstanceOf(Unit);
		expect(entity).toMatchObject({
			id: "id-value-1",
			name: "name-value-2",
			abbreviation: "abbreviation-value-3"
		});
	});
});
