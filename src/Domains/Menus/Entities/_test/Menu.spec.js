import { describe, expect, it } from "@jest/globals";
import Menu from "../Menu.js";

describe("Menu", () => {
	it("returns null when record is missing", () => {
		expect(Menu.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			placeId: "placeId-value-2",
			name: "name-value-3",
			categoryId: "categoryId-value-4",
			description: "description-value-5",
			isActive: "isActive-value-6"
		};

		const entity = Menu.fromPersistence(record);

		expect(entity).toBeInstanceOf(Menu);
		expect(entity).toMatchObject({
			id: "id-value-1",
			placeId: "placeId-value-2",
			name: "name-value-3",
			categoryId: "categoryId-value-4",
			description: "description-value-5",
			isActive: "isActive-value-6"
		});
	});
});
