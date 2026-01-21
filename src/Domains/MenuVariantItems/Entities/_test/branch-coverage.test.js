import { describe, expect, it } from "@jest/globals";
import MenuVariantItem from "../MenuVariantItem.js";

describe("MenuVariantItem entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(MenuVariantItem.fromPersistence(null)).toBeNull();
	});

	it("MenuVariantItem handles null defaults", () => {
		const entity = MenuVariantItem.fromPersistence({ menuVariantId: 1, name: "Item" });
		expect(entity).toMatchObject({ id: null, additionalPrice: null });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new MenuVariantItem({ menuVariantId: 1, name: "MV" });
			expect(entity).toBeInstanceOf(MenuVariantItem);
			expect(entity).toMatchObject({ additionalPrice: null });
		});
	});
});
