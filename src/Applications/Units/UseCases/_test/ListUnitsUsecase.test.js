import { jest } from "@jest/globals";
import ListUnitsUsecase from "../ListUnitsUsecase.js";

describe("ListUnitsUsecase", () => {
	let unitService;
	let usecase;

	beforeEach(() => {
		unitService = { listUnits: jest.fn() };
		usecase = new ListUnitsUsecase({ unitService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListUnitsUsecase()).toThrow("UNIT_USECASE.MISSING_SERVICE");
	});

	test("should list units", async () => {
		const records = [{ id: 1 }];
		unitService.listUnits.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(unitService.listUnits).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
