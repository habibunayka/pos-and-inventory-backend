import { describe, expect, it } from "@jest/globals";
import Place from "../Place.js";

describe("Place entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(Place.fromPersistence(null)).toBeNull();
	});

	it("Place defaults null/booleans and uses snake_case props", () => {
		const entity = Place.fromPersistence({
			name: "Cafe",
			logo_path: "logo.png",
			is_active: false
		});

		expect(entity).toMatchObject({
			id: null,
			name: "Cafe",
			address: null,
			phone: null,
			logoPath: "logo.png",
			type: null,
			isActive: false
		});
	});

	it("Place maps camelCase fields and defaults to true", () => {
		const entity = Place.fromPersistence({
			id: 5,
			name: "Shop",
			address: "Street",
			phone: "123",
			logoPath: "camel.png",
			type: "retail",
			isActive: true
		});

		expect(entity).toMatchObject({
			id: 5,
			name: "Shop",
			address: "Street",
			phone: "123",
			logoPath: "camel.png",
			type: "retail",
			isActive: true
		});
	});

	it("Place defaults logoPath and isActive when missing", () => {
		const entity = Place.fromPersistence({ name: "Bare" });
		expect(entity).toMatchObject({ logoPath: null, isActive: true });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new Place({ name: "CtorPlace" });
			expect(entity).toBeInstanceOf(Place);
			expect(entity).toMatchObject({ address: null, isActive: true });
		});
	});
});
