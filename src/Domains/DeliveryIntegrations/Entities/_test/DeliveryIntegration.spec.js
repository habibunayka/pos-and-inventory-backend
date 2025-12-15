import { describe, expect, it } from "@jest/globals";
import DeliveryIntegration from "../DeliveryIntegration.js";

describe("DeliveryIntegration", () => {
	it("returns null when record is missing", () => {
		expect(DeliveryIntegration.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			placeId: "placeId-value-2",
			platformName: "platformName-value-3",
			apiKey: "apiKey-value-4",
			settingsJson: "settingsJson-value-5"
		};

		const entity = DeliveryIntegration.fromPersistence(record);

		expect(entity).toBeInstanceOf(DeliveryIntegration);
		expect(entity).toMatchObject({
			id: "id-value-1",
			placeId: "placeId-value-2",
			platformName: "platformName-value-3",
			apiKey: "apiKey-value-4",
			settingsJson: "settingsJson-value-5"
		});
	});

});
