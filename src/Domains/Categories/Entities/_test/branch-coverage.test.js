import { describe, expect, it } from "@jest/globals";
import Category from "../Category.js";

describe("Category entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(Category.fromPersistence(null)).toBeNull();
	});

	it("Category uses null and active defaults", () => {
		const entity = Category.fromPersistence({});
		expect(entity).toMatchObject({ id: null, name: null, type: "menu" });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new Category({ name: "Cat" });
			expect(entity).toBeInstanceOf(Category);
			expect(entity).toMatchObject({ id: null, type: "menu" });
		});
	});
});
