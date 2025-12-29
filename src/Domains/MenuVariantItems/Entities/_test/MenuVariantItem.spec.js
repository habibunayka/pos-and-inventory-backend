import { describe, expect, it } from "@jest/globals";
import MenuVariantItem from "../MenuVariantItem.js";

describe("MenuVariantItem", () => {
	it("returns null when record is missing", () => {
		expect(MenuVariantItem.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			menuVariantId: "menuVariantId-value-2",
			name: "name-value-3",
			additionalPrice: "additionalPrice-value-4"
		};

		const entity = MenuVariantItem.fromPersistence(record);

		expect(entity).toBeInstanceOf(MenuVariantItem);
		expect(entity).toMatchObject({
			id: "id-value-1",
			menuVariantId: "menuVariantId-value-2",
			name: "name-value-3",
			additionalPrice: "additionalPrice-value-4"
		});
	});
});
