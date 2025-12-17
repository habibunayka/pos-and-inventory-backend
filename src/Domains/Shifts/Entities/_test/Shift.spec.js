import { describe, expect, it } from "@jest/globals";
import Shift from "../Shift.js";

describe("Shift", () => {
	it("returns null when record is missing", () => {
		expect(Shift.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			placeId: "placeId-value-2",
			name: "name-value-3",
			startTime: "startTime-value-4",
			endTime: "endTime-value-5",
			description: "description-value-6",
			isActive: "isActive-value-7"
		};

		const entity = Shift.fromPersistence(record);

		expect(entity).toBeInstanceOf(Shift);
		expect(entity).toMatchObject({
			id: "id-value-1",
			placeId: "placeId-value-2",
			name: "name-value-3",
			startTime: "startTime-value-4",
			endTime: "endTime-value-5",
			description: "description-value-6",
			isActive: "isActive-value-7"
		});
	});
});
