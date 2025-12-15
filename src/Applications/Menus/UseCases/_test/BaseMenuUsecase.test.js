import BaseMenuUsecase from "../BaseMenuUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseMenuUsecase {}

describe("BaseMenuUsecase", () => {
	test("should throw when service missing", () => {
		expect(() => new BaseMenuUsecase()).toThrow("MENU_USECASE.MISSING_SERVICE");
	});

	test("_toInt should return integer when valid", () => {
		const usecase = new DummyUsecase({ menuService: {} });
		expect(usecase._toInt("5", "menuId")).toBe(5);
	});

	test("_toInt should throw when invalid", () => {
		const usecase = new DummyUsecase({ menuService: {} });
		expect(() => usecase._toInt("abc")).toThrow(new ValidationError("id must be a positive integer"));
	});
});
