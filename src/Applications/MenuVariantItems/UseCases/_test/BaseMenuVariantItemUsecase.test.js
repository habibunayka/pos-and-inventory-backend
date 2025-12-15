import BaseMenuVariantItemUsecase from "../BaseMenuVariantItemUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseMenuVariantItemUsecase {}

describe("BaseMenuVariantItemUsecase", () => {
	test("should throw when service missing", () => {
		expect(() => new BaseMenuVariantItemUsecase()).toThrow("MENUVARIANTITEM_USECASE.MISSING_SERVICE");
	});

	test("_toInt should return integer when valid", () => {
		const usecase = new DummyUsecase({ menuVariantItemService: {} });
		expect(usecase._toInt("5", "menuVariantItemId")).toBe(5);
	});

	test("_toInt should throw when invalid", () => {
		const usecase = new DummyUsecase({ menuVariantItemService: {} });
		expect(() => usecase._toInt("abc")).toThrow(new ValidationError("id must be a positive integer"));
	});
});
