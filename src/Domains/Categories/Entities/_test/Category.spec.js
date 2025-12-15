import { describe, expect, it } from "@jest/globals";
import Category from "../Category.js";

describe("Category", () => {
	it("returns null when record is missing", () => {
		expect(Category.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			name: "name-value-2"
		};

		const entity = Category.fromPersistence(record);

		expect(entity).toBeInstanceOf(Category);
		expect(entity).toMatchObject({
			id: "id-value-1",
			name: "name-value-2"
		});
	});

});
