import { jest } from "@jest/globals";
import BaseUnitUsecase from "../BaseUnitUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseUnitUsecase {}

describe("BaseUnitUsecase", () => {
	test("should throw when service missing", () => {
		expect(() => new BaseUnitUsecase()).toThrow("UNIT_USECASE.MISSING_SERVICE");
	});

	test("_normalize should trim/lowercase", () => {
		const usecase = new DummyUsecase({ unitService: {} });
		expect(usecase._normalize("  Gram ")).toBe("gram");
	});

	test("_assertNameAvailable should throw when name missing", async () => {
		const usecase = new DummyUsecase({ unitService: { getUnitByName: jest.fn() } });
		await expect(usecase._assertNameAvailable("  ")).rejects.toThrow(
			new ValidationError("Unit name is required")
		);
	});

	test("_assertNameAvailable should throw when name exists", async () => {
		const unitService = { getUnitByName: jest.fn().mockResolvedValue({ id: 1, name: "gram" }) };
		const usecase = new DummyUsecase({ unitService });

		await expect(usecase._assertNameAvailable("Gram")).rejects.toThrow(
			new ValidationError("Unit gram already exists")
		);
	});

	test("_assertNameAvailable should allow when same id", async () => {
		const unitService = { getUnitByName: jest.fn().mockResolvedValue({ id: 2, name: "gram" }) };
		const usecase = new DummyUsecase({ unitService });

		await expect(usecase._assertNameAvailable("Gram", 2)).resolves.toBe("gram");
	});

	test("_assertNameAvailable should return normalized when available", async () => {
		const unitService = { getUnitByName: jest.fn().mockResolvedValue(null) };
		const usecase = new DummyUsecase({ unitService });

		await expect(usecase._assertNameAvailable("  KG ")).resolves.toBe("kg");
	});
});
