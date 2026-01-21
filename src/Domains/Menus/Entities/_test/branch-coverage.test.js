import { describe, expect, it } from "@jest/globals";
import Menu from "../Menu.js";

describe("Menu entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(Menu.fromPersistence(null)).toBeNull();
	});

	it("Menu sets defaults when not provided", () => {
		const entity = Menu.fromPersistence({ name: "Item" });
		expect(entity).toMatchObject({ placeId: null, categoryId: null, description: null, isActive: true });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new Menu({ name: "MenuCtor" });
			expect(entity).toBeInstanceOf(Menu);
			expect(entity).toMatchObject({ placeId: null, description: null, isActive: true });
		});
	});
});
