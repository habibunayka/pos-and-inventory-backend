import { jest } from "@jest/globals";
import UpdateWasteUsecase from "../UpdateWasteUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("UpdateWasteUsecase", () => {
	let wasteService;
	let usecase;

	beforeEach(() => {
		wasteService = { updateWaste: jest.fn() };
		usecase = new UpdateWasteUsecase({ wasteService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateWasteUsecase()).toThrow("UPDATE_WASTE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payload not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when qty invalid", async () => {
		await expect(usecase.execute(1, { qty: "abc" })).rejects.toThrow(new ValidationError("qty must be a number"));
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No fields to update"));
	});

	test("should throw when record not found", async () => {
		wasteService.updateWaste.mockResolvedValue(null);

		await expect(usecase.execute(1, { qty: 1 })).rejects.toThrow(new ValidationError("Waste not found"));
	});

	test("should update waste with normalized payload", async () => {
		const updated = { id: 2 };
		wasteService.updateWaste.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			ingredientId: "3",
			qty: "4",
			unitId: "5",
			reason: "  note "
		});

		expect(wasteService.updateWaste).toHaveBeenCalledWith({
			id: 2,
			data: { ingredientId: 3, qty: 4, unitId: 5, reason: "note" }
		});
		expect(result).toEqual(updated);
	});
});
