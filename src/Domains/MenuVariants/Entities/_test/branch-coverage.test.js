import { describe, expect, it } from "@jest/globals";
import MenuVariant from "../MenuVariant.js";

describe("MenuVariant entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(MenuVariant.fromPersistence(null)).toBeNull();
	});

	it("MenuVariant applies defaults", () => {
		const entity = MenuVariant.fromPersistence({ menuId: 1, name: "Large" });
		expect(entity).toMatchObject({ id: null, name: "Large" });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new MenuVariant({ menuId: 1, name: "Variant" });
			expect(entity).toBeInstanceOf(MenuVariant);
			expect(entity).toMatchObject({ id: null });
		});
	});
});
