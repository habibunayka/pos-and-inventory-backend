import BaseSystemLogUsecase from "../BaseSystemLogUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseSystemLogUsecase {}

describe("BaseSystemLogUsecase", () => {
	test("should throw when service missing", () => {
		expect(() => new BaseSystemLogUsecase()).toThrow("SYSTEMLOG_USECASE.MISSING_SERVICE");
	});

	test("_toInt should convert valid positive integers", () => {
		const usecase = new DummyUsecase({ systemLogService: {} });

		expect(usecase._toInt("5")).toBe(5);
	});

	test("_toInt should throw on invalid ids", () => {
		const usecase = new DummyUsecase({ systemLogService: {} });

		expect(() => usecase._toInt("abc")).toThrow(new ValidationError("id must be a positive integer"));
		expect(() => usecase._toInt(0)).toThrow(new ValidationError("id must be a positive integer"));
	});
});
