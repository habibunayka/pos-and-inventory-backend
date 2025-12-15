import { jest } from "@jest/globals";
import GetTableUsecase from "../GetTableUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";

describe("GetTableUsecase", () => {
	let tableService;
	let usecase;

	beforeEach(() => {
		tableService = { getTable: jest.fn() };
		usecase = new GetTableUsecase({ tableService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetTableUsecase()).toThrow("TABLE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when table not found", async () => {
		tableService.getTable.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should return table when found", async () => {
		tableService.getTable.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(tableService.getTable).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
