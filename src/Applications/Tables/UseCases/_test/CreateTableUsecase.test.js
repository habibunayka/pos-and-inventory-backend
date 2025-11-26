import { jest } from "@jest/globals";
import CreateTableUsecase from "../CreateTableUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateTableUsecase", () => {
	let tableService;
	let placeService;
	let usecase;

	beforeEach(() => {
		tableService = { createTable: jest.fn() };
		placeService = { getPlace: jest.fn().mockResolvedValue({ id: 1 }), supportsPlaceValidation: true };
		usecase = new CreateTableUsecase({ tableService, placeService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateTableUsecase()).toThrow("TABLE_USECASE.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ placeId: 1, name: "   " })).rejects.toThrow(
			new ValidationError("name is required")
		);
	});

	test("should create table with normalized payload", async () => {
		const created = { id: 2 };
		tableService.createTable.mockResolvedValue(created);

		const result = await usecase.execute({ placeId: "1", name: " Table ", status: "  active " });

		expect(tableService.createTable).toHaveBeenCalledWith({ placeId: 1, name: "Table", status: "active" });
		expect(result).toEqual(created);
	});
});
