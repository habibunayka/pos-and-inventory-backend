import { jest } from "@jest/globals";
import CreateUnitUsecase from "../CreateUnitUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateUnitUsecase", () => {
	let unitService;
	let usecase;

	beforeEach(() => {
		unitService = { getUnitByName: jest.fn(), createUnit: jest.fn() };
		usecase = new CreateUnitUsecase({ unitService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateUnitUsecase()).toThrow("UNIT_USECASE.MISSING_SERVICE");
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ name: "   " })).rejects.toThrow(new ValidationError("Unit name is required"));
	});

	test("should throw when name exists", async () => {
		unitService.getUnitByName.mockResolvedValue({ id: 1, name: "gram" });

		await expect(usecase.execute({ name: "Gram" })).rejects.toThrow(
			new ValidationError("Unit gram already exists")
		);
	});

	test("should create unit with normalized name", async () => {
		unitService.getUnitByName.mockResolvedValue(null);
		const created = { id: 2, name: "gram" };
		unitService.createUnit.mockResolvedValue(created);

		const result = await usecase.execute({ name: " Gram " });

		expect(unitService.createUnit).toHaveBeenCalledWith({ name: "gram" });
		expect(result).toEqual(created);
	});
});
