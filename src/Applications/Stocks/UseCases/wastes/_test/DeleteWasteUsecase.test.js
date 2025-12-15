import { jest } from "@jest/globals";
import DeleteWasteUsecase from "../DeleteWasteUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("DeleteWasteUsecase", () => {
	let wasteService;
	let usecase;

	beforeEach(() => {
		wasteService = { deleteWaste: jest.fn() };
		usecase = new DeleteWasteUsecase({ wasteService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteWasteUsecase()).toThrow("DELETE_WASTE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		wasteService.deleteWaste.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Waste not found"));
	});

	test("should delete waste", async () => {
		wasteService.deleteWaste.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(wasteService.deleteWaste).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
