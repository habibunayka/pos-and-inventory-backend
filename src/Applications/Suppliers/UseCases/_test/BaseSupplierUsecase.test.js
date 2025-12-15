import BaseSupplierUsecase from "../BaseSupplierUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseSupplierUsecase {}

describe("BaseSupplierUsecase", () => {
	test("should throw when service missing", () => {
		expect(() => new BaseSupplierUsecase()).toThrow("SUPPLIER_USECASE.MISSING_SERVICE");
	});

	test("_requireText should validate non-empty", () => {
		const usecase = new DummyUsecase({ supplierService: {} });
		expect(usecase._requireText("  abc  ", "name")).toBe("abc");
		expect(() => usecase._requireText("   ", "name")).toThrow(new ValidationError("name is required"));
	});

	test("_textOrNull should normalize strings and null", () => {
		const usecase = new DummyUsecase({ supplierService: {} });
		expect(usecase._textOrNull("  abc ")).toBe("abc");
		expect(usecase._textOrNull(null)).toBeNull();
		expect(usecase._textOrNull(undefined)).toBeUndefined();
	});
});
