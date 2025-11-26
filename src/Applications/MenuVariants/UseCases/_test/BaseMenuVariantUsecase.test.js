import BaseMenuVariantUsecase from "../BaseMenuVariantUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseMenuVariantUsecase {}

describe("BaseMenuVariantUsecase", () => {
	test("should throw when service missing", () => {
		expect(() => new BaseMenuVariantUsecase()).toThrow("MENUVARIANT_USECASE.MISSING_SERVICE");
	});

	test("_toInt should return integer when valid", () => {
		const usecase = new DummyUsecase({ menuVariantService: {} });
		expect(usecase._toInt("5", "menuVariantId")).toBe(5);
	});

	test("_toInt should throw when invalid", () => {
		const usecase = new DummyUsecase({ menuVariantService: {} });
		expect(() => usecase._toInt("abc")).toThrow(new ValidationError("id must be a positive integer"));
	});
});
