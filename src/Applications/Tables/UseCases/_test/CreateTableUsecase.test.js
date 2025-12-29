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
		await expect(usecase.execute({ placeId: 1, name: "   ", capacity: 2 })).rejects.toThrow(
			new ValidationError("name is required")
		);
	});

	test("should throw when capacity invalid", async () => {
		await expect(usecase.execute({ placeId: 1, name: "Desk", capacity: 0 })).rejects.toThrow(
			new ValidationError("capacity must be a positive integer")
		);
	});

	test("should create table with normalized payload", async () => {
		const created = { id: 2 };
		tableService.createTable.mockResolvedValue(created);

		const result = await usecase.execute({ placeId: "1", name: " Table ", capacity: "4", status: "  active " });

		expect(tableService.createTable).toHaveBeenCalledWith({
			placeId: 1,
			name: "Table",
			capacity: 4,
			status: "active"
		});
		expect(result).toEqual(created);
	});

	test("should default status to null when undefined and allow null explicitly", async () => {
		tableService.createTable.mockResolvedValue({});

		await usecase.execute({ placeId: 1, name: "Desk", capacity: 4 });
		expect(tableService.createTable).toHaveBeenLastCalledWith({
			placeId: 1,
			name: "Desk",
			capacity: 4,
			status: null
		});

		await usecase.execute({ placeId: 1, name: "Desk", capacity: 4, status: null });
		expect(tableService.createTable).toHaveBeenLastCalledWith({
			placeId: 1,
			name: "Desk",
			capacity: 4,
			status: null
		});
	});

	test("should normalize blank status to null", async () => {
		tableService.createTable.mockResolvedValue({});

		await usecase.execute({ placeId: 1, name: "Desk", capacity: 4, status: "   " });

		expect(tableService.createTable).toHaveBeenCalledWith({
			placeId: 1,
			name: "Desk",
			capacity: 4,
			status: null
		});
	});

	test("should validate place existence or skip when validation disabled", async () => {
		placeService.getPlace.mockResolvedValue(null);
		await expect(usecase.execute({ placeId: 9, name: "Desk", capacity: 4 })).rejects.toThrow(
			new ValidationError("placeId not found")
		);

		const noValidation = new CreateTableUsecase({
			tableService,
			placeService: { supportsPlaceValidation: false }
		});

		await noValidation.execute({ placeId: "3", name: "NoValidate", capacity: "2" });
		expect(tableService.createTable).toHaveBeenLastCalledWith({
			placeId: 3,
			name: "NoValidate",
			capacity: 2,
			status: null
		});
	});
});
