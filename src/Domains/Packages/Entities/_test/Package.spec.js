import { describe, expect, it } from "@jest/globals";
import Package from "../Package.js";

describe("Package", () => {
	it("returns null when record is missing", () => {
		expect(Package.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			name: "name-value-2",
			description: "description-value-3"
		};

		const entity = Package.fromPersistence(record);

		expect(entity).toBeInstanceOf(Package);
		expect(entity).toMatchObject({
			id: "id-value-1",
			name: "name-value-2",
			description: "description-value-3"
		});
	});

});
