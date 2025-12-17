import { describe, expect, it } from "@jest/globals";
import Permission from "../Permission.js";

describe("Permission", () => {
	it("returns null when record is missing", () => {
		expect(Permission.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			name: "name-value-2",
			description: "description-value-3"
		};

		const entity = Permission.fromPersistence(record);

		expect(entity).toBeInstanceOf(Permission);
		expect(entity).toMatchObject({
			id: "id-value-1",
			name: "name-value-2",
			description: "description-value-3"
		});
	});
});
