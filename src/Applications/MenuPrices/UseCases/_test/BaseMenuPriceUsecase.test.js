import BaseMenuPriceUsecase from "../BaseMenuPriceUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseMenuPriceUsecase {}

describe("BaseMenuPriceUsecase", () => {
	test("should throw when service missing", () => {
		expect(() => new BaseMenuPriceUsecase()).toThrow("MENUPRICE_USECASE.MISSING_SERVICE");
	});

	test("_toInt should return integer when valid", () => {
		const usecase = new DummyUsecase({ menuPriceService: {} });
		expect(usecase._toInt("5", "menuId")).toBe(5);
	});

	test("_toInt should throw when invalid", () => {
		const usecase = new DummyUsecase({ menuPriceService: {} });
		expect(() => usecase._toInt("abc")).toThrow(new ValidationError("id must be a positive integer"));
	});
});
