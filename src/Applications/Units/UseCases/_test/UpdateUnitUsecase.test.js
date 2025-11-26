import { jest } from "@jest/globals";
import UpdateUnitUsecase from "../UpdateUnitUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateUnitUsecase", () => {
	let unitService;
	let usecase;

	beforeEach(() => {
		unitService = { getUnitByName: jest.fn(), updateUnit: jest.fn() };
		usecase = new UpdateUnitUsecase({ unitService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateUnitUsecase()).toThrow("UNIT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when name exists", async () => {
		unitService.getUnitByName.mockResolvedValue({ id: 2, name: "gram" });

		await expect(usecase.execute(1, { name: "gram" })).rejects.toThrow(
			new ValidationError("Unit gram already exists")
		);
	});

	test("should throw when record not found", async () => {
		unitService.getUnitByName.mockResolvedValue(null);
		unitService.updateUnit.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "kg" })).rejects.toThrow(new ValidationError("Unit not found"));
	});

	test("should update unit with normalized name", async () => {
		unitService.getUnitByName.mockResolvedValue(null);
		const updated = { id: 2, name: "kg" };
		unitService.updateUnit.mockResolvedValue(updated);

		const result = await usecase.execute("2", { name: " KG " });

		expect(unitService.updateUnit).toHaveBeenCalledWith({ id: 2, data: { name: "kg" } });
		expect(result).toEqual(updated);
	});
});
