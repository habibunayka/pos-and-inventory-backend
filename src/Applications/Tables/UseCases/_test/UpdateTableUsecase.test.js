import { jest } from "@jest/globals";
import UpdateTableUsecase from "../UpdateTableUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateTableUsecase", () => {
	let tableService;
	let placeService;
	let usecase;

	beforeEach(() => {
		tableService = { getTable: jest.fn(), updateTable: jest.fn() };
		placeService = { getPlace: jest.fn().mockResolvedValue({ id: 1 }), supportsPlaceValidation: true };
		tableService.getTable.mockResolvedValue({ id: 1, placeId: 1, name: "Table" });
		usecase = new UpdateTableUsecase({ tableService, placeService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateTableUsecase()).toThrow("TABLE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when table not found", async () => {
		tableService.getTable.mockResolvedValue(null);
		await expect(usecase.execute(1, { name: "New" })).rejects.toThrow(new ValidationError("Table not found"));
	});

	test("should throw when name empty", async () => {
		await expect(usecase.execute(1, { name: "  " })).rejects.toThrow(new ValidationError("name cannot be empty"));
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No updatable fields provided"));
	});

	test("should update table with validated placeId", async () => {
		const updated = { id: 1, name: "New" };
		tableService.updateTable.mockResolvedValue(updated);

		const result = await usecase.execute("1", { placeId: "1", name: " New ", status: " busy " });

		expect(tableService.updateTable).toHaveBeenCalledWith({
			id: 1,
			tableData: { placeId: 1, name: "New", status: "busy" }
		});
		expect(result).toEqual(updated);
	});

	test("should normalize nullable/blank status", async () => {
		tableService.updateTable.mockResolvedValue({});

		await usecase.execute(1, { status: null, placeId: 1 });
		expect(tableService.updateTable).toHaveBeenLastCalledWith({
			id: 1,
			tableData: { placeId: 1, status: null }
		});

		await usecase.execute(1, { status: "   " });
		expect(tableService.updateTable).toHaveBeenLastCalledWith({
			id: 1,
			tableData: { status: null }
		});
	});
});
