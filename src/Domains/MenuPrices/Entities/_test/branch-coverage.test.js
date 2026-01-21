import { describe, expect, it } from "@jest/globals";
import MenuPrice from "../MenuPrice.js";

describe("MenuPrice entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(MenuPrice.fromPersistence(null)).toBeNull();
	});

	it("MenuPrice covers active default", () => {
		const entity = MenuPrice.fromPersistence({ menuId: 1, price: 10, effectiveDate: "2024-01-01" });
		expect(entity).toMatchObject({ id: null, effectiveDate: "2024-01-01" });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new MenuPrice({ menuId: 1, price: 10, effectiveDate: "2024" });
			expect(entity).toBeInstanceOf(MenuPrice);
			expect(entity).toMatchObject({ id: null });
		});
	});
});
