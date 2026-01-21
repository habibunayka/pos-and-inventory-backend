import { describe, expect, it } from "@jest/globals";
import Permission from "../Permission.js";

describe("Permission entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(Permission.fromPersistence(null)).toBeNull();
	});

	it("Permission applies null defaults", () => {
		const entity = Permission.fromPersistence({ name: "perm" });
		expect(entity).toMatchObject({ id: null, description: null });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new Permission({ name: "Perm" });
			expect(entity).toBeInstanceOf(Permission);
			expect(entity).toMatchObject({ description: null });
		});
	});
});
