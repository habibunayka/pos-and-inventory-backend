import { jest } from "@jest/globals";
import ListTablesUsecase from "../ListTablesUsecase.js";

describe("ListTablesUsecase", () => {
	let tableService;
	let usecase;

	beforeEach(() => {
		tableService = { listTables: jest.fn() };
		usecase = new ListTablesUsecase({ tableService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListTablesUsecase()).toThrow("TABLE_USECASE.MISSING_SERVICE");
	});

	test("should list tables", async () => {
		const records = [{ id: 1 }];
		tableService.listTables.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(tableService.listTables).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
