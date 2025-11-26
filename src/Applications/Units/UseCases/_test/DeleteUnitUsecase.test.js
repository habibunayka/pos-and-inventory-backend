import { jest } from "@jest/globals";
import DeleteUnitUsecase from "../DeleteUnitUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteUnitUsecase", () => {
	let unitService;
	let usecase;

	beforeEach(() => {
		unitService = { deleteUnit: jest.fn() };
		usecase = new DeleteUnitUsecase({ unitService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteUnitUsecase()).toThrow("UNIT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should delete unit", async () => {
		unitService.deleteUnit.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(unitService.deleteUnit).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
