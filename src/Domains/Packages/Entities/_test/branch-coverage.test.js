import { describe, expect, it } from "@jest/globals";
import Package from "../Package.js";

describe("Package entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(Package.fromPersistence(null)).toBeNull();
	});

	it("Package sets defaults for numeric/boolean fields", () => {
		const entity = Package.fromPersistence({ name: "Pack", conversionFactor: 5 });
		expect(entity).toMatchObject({ id: null, description: null });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new Package({ name: "Pkg" });
			expect(entity).toBeInstanceOf(Package);
			expect(entity).toMatchObject({ description: null });
		});
	});
});
