import { describe, expect, it } from "@jest/globals";
import Shift from "../Shift.js";

describe("Shift entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(Shift.fromPersistence(null)).toBeNull();
	});

	it("Shift defaults time-related fields", () => {
		const entity = Shift.fromPersistence({
			placeId: 1,
			name: "Morning",
			startTime: "08:00",
			endTime: "16:00"
		});
		expect(entity).toMatchObject({ id: null, description: null, isActive: true });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new Shift({ placeId: 1, name: "Shift", startTime: "08:00", endTime: "09:00" });
			expect(entity).toBeInstanceOf(Shift);
			expect(entity).toMatchObject({ description: null, isActive: true });
		});
	});
});
