import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BaseTransactionUsecase from "../BaseTransactionUsecase.js";

class DummyUsecase extends BaseTransactionUsecase {}

describe("BaseTransactionUsecase", () => {
	const usecase = new DummyUsecase();

	test("_ensureObject should throw when payload is not object", () => {
		expect(() => usecase._ensureObject(null)).toThrow(new ValidationError("Payload must be an object"));
		expect(() => usecase._ensureObject([])).toThrow(new ValidationError("Payload must be an object"));
		expect(() => usecase._ensureObject("str")).toThrow(new ValidationError("Payload must be an object"));
	});

	test("_ensureObject should allow plain objects", () => {
		expect(() => usecase._ensureObject({})).not.toThrow();
	});

	test("_positiveInt should return integer when valid", () => {
		expect(usecase._positiveInt("5", "id")).toBe(5);
	});

	test("_positiveInt should throw when invalid", () => {
		expect(() => usecase._positiveInt("abc", "id")).toThrow(new ValidationError("id must be a positive integer"));
		expect(() => usecase._positiveInt(0, "id")).toThrow(new ValidationError("id must be a positive integer"));
	});
});
