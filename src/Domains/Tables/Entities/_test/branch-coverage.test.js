import { describe, expect, it } from "@jest/globals";
import Table from "../Table.js";

describe("Table entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(Table.fromPersistence(null)).toBeNull();
	});

	it("Table applies defaults", () => {
		const entity = Table.fromPersistence({ name: "T1", placeId: 1 });
		expect(entity).toMatchObject({ id: null, status: null, capacity: null });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new Table({ placeId: 1, name: "T1" });
			expect(entity).toBeInstanceOf(Table);
			expect(entity).toMatchObject({ status: null, capacity: null });
		});
	});
});
