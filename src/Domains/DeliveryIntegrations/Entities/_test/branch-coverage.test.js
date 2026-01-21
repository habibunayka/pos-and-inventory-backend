import { describe, expect, it } from "@jest/globals";
import DeliveryIntegration from "../DeliveryIntegration.js";

describe("DeliveryIntegration entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(DeliveryIntegration.fromPersistence(null)).toBeNull();
	});

	it("DeliveryIntegration covers nullable config", () => {
		const entity = DeliveryIntegration.fromPersistence({ placeId: 2, platformName: "Y" });
		expect(entity).toMatchObject({ id: null, apiKey: null, placeId: 2, settingsJson: null });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new DeliveryIntegration({ placeId: 1, platformName: "Plat" });
			expect(entity).toBeInstanceOf(DeliveryIntegration);
			expect(entity).toMatchObject({ apiKey: null });
		});
	});
});
