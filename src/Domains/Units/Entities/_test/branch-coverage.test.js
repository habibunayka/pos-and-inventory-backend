import { describe, expect, it } from "@jest/globals";
import Unit from "../Unit.js";

describe("Unit entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(Unit.fromPersistence(null)).toBeNull();
	});

	it("Unit uses defaults", () => {
		const entity = Unit.fromPersistence({ name: "gram" });
		expect(entity).toMatchObject({ id: null, name: "gram" });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new Unit({ name: "gram", abbreviation: "gr" });
			expect(entity).toBeInstanceOf(Unit);
			expect(entity).toMatchObject({ id: null });
		});
	});
});
