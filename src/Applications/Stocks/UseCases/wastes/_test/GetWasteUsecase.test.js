import { jest } from "@jest/globals";
import GetWasteUsecase from "../GetWasteUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("GetWasteUsecase", () => {
	let wasteService;
	let usecase;

	beforeEach(() => {
		wasteService = { getWaste: jest.fn() };
		usecase = new GetWasteUsecase({ wasteService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetWasteUsecase()).toThrow("GET_WASTE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when record not found", async () => {
		wasteService.getWaste.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Waste not found"));
	});

	test("should return waste when found", async () => {
		wasteService.getWaste.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(wasteService.getWaste).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
