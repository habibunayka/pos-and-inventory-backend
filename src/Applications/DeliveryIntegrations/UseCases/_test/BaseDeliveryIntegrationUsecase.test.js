import BaseDeliveryIntegrationUsecase from "../BaseDeliveryIntegrationUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseDeliveryIntegrationUsecase {}

describe("BaseDeliveryIntegrationUsecase", () => {
	test("should throw when service is missing", () => {
		expect(() => new BaseDeliveryIntegrationUsecase()).toThrow("DELIVERYINTEGRATION_USECASE.MISSING_SERVICE");
	});

	test("_toInt should convert positive integers", () => {
		const usecase = new DummyUsecase({ deliveryIntegrationService: {} });

		expect(usecase._toInt("5")).toBe(5);
		expect(usecase._toInt(10, "placeId")).toBe(10);
	});

	test("_toInt should throw on invalid numbers", () => {
		const usecase = new DummyUsecase({ deliveryIntegrationService: {} });

		expect(() => usecase._toInt("abc")).toThrow(new ValidationError("id must be a positive integer"));
		expect(() => usecase._toInt(0, "placeId")).toThrow(
			new ValidationError("placeId must be a positive integer")
		);
		expect(() => usecase._toInt(-1)).toThrow(new ValidationError("id must be a positive integer"));
	});
});
