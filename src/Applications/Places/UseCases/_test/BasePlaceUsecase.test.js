import BasePlaceUsecase from "../BasePlaceUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BasePlaceUsecase {}

describe("BasePlaceUsecase", () => {
	test("should throw when service missing", () => {
		expect(() => new BasePlaceUsecase()).toThrow("PLACE_USECASE.MISSING_SERVICE");
	});

	test("_normalizeId should parse positive integer", () => {
		const usecase = new DummyUsecase({ placeService: {} });
		expect(usecase._normalizeId("5")).toBe(5);
	});

	test("_normalizeId should throw on invalid id", () => {
		const usecase = new DummyUsecase({ placeService: {} });
		expect(() => usecase._normalizeId("abc")).toThrow(new ValidationError("id must be a positive integer"));
	});

	test("_normalizePayload should validate shapes", () => {
		const usecase = new DummyUsecase({ placeService: {} });
		expect(() =>
			usecase._normalizePayload({ name: "A", address: "  ", phone: null, logoPath: null, type: null, isActive: true })
		).not.toThrow();
	});

	test("_normalizePayload should throw on invalid fields", () => {
		const usecase = new DummyUsecase({ placeService: {} });
		expect(() => usecase._normalizePayload("str")).toThrow(new ValidationError("Payload must be an object"));
		expect(() => usecase._normalizePayload({ name: 123 })).toThrow(new ValidationError("name is required"));
		expect(() => usecase._normalizePayload({ phone: 123 })).toThrow(
			new ValidationError("phone must be a string or null")
		);
	});
});
