import { describe, expect, it } from "@jest/globals";
import MenuVariant from "../MenuVariant.js";

describe("MenuVariant", () => {
	it("returns null when record is missing", () => {
		expect(MenuVariant.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			menuId: "menuId-value-2",
			name: "name-value-3"
		};

		const entity = MenuVariant.fromPersistence(record);

		expect(entity).toBeInstanceOf(MenuVariant);
		expect(entity).toMatchObject({
			id: "id-value-1",
			menuId: "menuId-value-2",
			name: "name-value-3"
		});
	});
});
