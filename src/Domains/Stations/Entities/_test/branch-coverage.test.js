import { describe, expect, it } from "@jest/globals";
import Station from "../Station.js";

describe("Station entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(Station.fromPersistence(null)).toBeNull();
	});

	it("Station applies defaults and snake_case placeId", () => {
		const entity = Station.fromPersistence({ name: "Station", placeId: 9 });
		expect(entity).toMatchObject({ id: null, placeId: 9, description: null, isActive: true });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new Station({ placeId: 1, name: "Station" });
			expect(entity).toBeInstanceOf(Station);
			expect(entity).toMatchObject({ description: null, isActive: true });
		});
	});
});
