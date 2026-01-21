import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import CreateWasteUsecase from "../CreateWasteUsecase.js";
import UpdateWasteUsecase from "../UpdateWasteUsecase.js";

describe("Waste usecase branch coverage", () => {
	it("CreateWasteUsecase handles null placeId and reason", async () => {
		const wasteService = { createWaste: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateWasteUsecase({ wasteService });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);

		await usecase.execute({ ingredientId: 1, qty: 2, placeId: null, reason: null });
		expect(wasteService.createWaste).toHaveBeenCalledWith({
			ingredientId: 1,
			qty: 2,
			placeId: null,
			reason: ""
		});
	});

	it("UpdateWasteUsecase handles default payload and reason", async () => {
		const wasteService = { updateWaste: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new UpdateWasteUsecase({ wasteService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);

		await usecase.execute(1, { reason: null });
		expect(wasteService.updateWaste).toHaveBeenCalledWith({
			id: 1,
			data: { reason: "" }
		});
	});
});
