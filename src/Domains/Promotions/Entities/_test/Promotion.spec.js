import { describe, expect, it } from "@jest/globals";
import Promotion from "../Promotion.js";

describe("Promotion", () => {
	it("returns null when record is missing", () => {
		expect(Promotion.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			placeId: "placeId-value-2",
			name: "name-value-3",
			startAt: "startAt-value-4",
			endAt: "endAt-value-5"
		};

		const entity = Promotion.fromPersistence(record);

		expect(entity).toBeInstanceOf(Promotion);
		expect(entity).toMatchObject({
			id: "id-value-1",
			placeId: "placeId-value-2",
			name: "name-value-3",
			startAt: "startAt-value-4",
			endAt: "endAt-value-5"
		});
	});

});
