import { jest } from "@jest/globals";
import DeleteTableUsecase from "../DeleteTableUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteTableUsecase", () => {
	let tableService;
	let usecase;

	beforeEach(() => {
		tableService = { deleteTable: jest.fn() };
		usecase = new DeleteTableUsecase({ tableService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteTableUsecase()).toThrow("TABLE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when deletion fails", async () => {
		tableService.deleteTable.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Table not found"));
	});

	test("should delete table", async () => {
		tableService.deleteTable.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(tableService.deleteTable).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
