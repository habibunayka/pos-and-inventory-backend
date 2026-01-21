import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateTableUsecase from "../CreateTableUsecase.js";
import UpdateTableUsecase from "../UpdateTableUsecase.js";

describe("Tables usecase branch coverage", () => {
	it("CreateTableUsecase covers null status and place validation failure", async () => {
		const usecase = new CreateTableUsecase({
			tableService: { createTable: jest.fn() },
			placeService: { supportsPlaceValidation: true, getPlace: jest.fn().mockResolvedValue(null) }
		});
		await expect(usecase.execute({ placeId: 1, name: "Name", capacity: 4 })).rejects.toThrow(ValidationError);
	});

	it("UpdateTableUsecase guards empty updates", async () => {
		const service = { getTable: jest.fn().mockResolvedValue({ id: 1 }), updateTable: jest.fn() };
		const usecase = new UpdateTableUsecase({ tableService: service });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);
	});

	it("UpdateTableUsecase rejects null name", async () => {
		const service = { getTable: jest.fn().mockResolvedValue({ id: 1 }), updateTable: jest.fn() };
		const usecase = new UpdateTableUsecase({ tableService: service });
		await expect(usecase.execute(1, { name: null })).rejects.toThrow(new ValidationError("name cannot be empty"));
	});

	it("CreateTableUsecase covers default args and nullish name branch", async () => {
		const tableService = { createTable: jest.fn() };
		const placeService = { supportsPlaceValidation: false };
		const usecase = new CreateTableUsecase({ tableService, placeService });

		await expect(usecase.execute()).rejects.toThrow(new ValidationError("placeId must be a positive integer"));
		await expect(usecase.execute({ placeId: 1, capacity: 2 })).rejects.toThrow(
			new ValidationError("name is required")
		);
	});
});
