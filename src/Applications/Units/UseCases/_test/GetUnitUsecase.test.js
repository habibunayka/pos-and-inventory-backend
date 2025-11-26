import { jest } from "@jest/globals";
import GetUnitUsecase from "../GetUnitUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetUnitUsecase", () => {
	let unitService;
	let usecase;

	beforeEach(() => {
		unitService = { getUnit: jest.fn() };
		usecase = new GetUnitUsecase({ unitService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetUnitUsecase()).toThrow("UNIT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when unit not found", async () => {
		unitService.getUnit.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Unit not found"));
	});

	test("should return unit when found", async () => {
		unitService.getUnit.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(unitService.getUnit).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
