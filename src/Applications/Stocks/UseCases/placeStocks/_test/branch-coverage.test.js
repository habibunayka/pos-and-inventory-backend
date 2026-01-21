import { describe, expect, it, jest } from "@jest/globals";
import UpdatePlaceStockUsecase from "../UpdatePlaceStockUsecase.js";

describe("Place stock usecase branch coverage", () => {
	it("UpdatePlaceStockUsecase handles default payload", async () => {
		const placeStockService = { updatePlaceStock: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new UpdatePlaceStockUsecase({ placeStockService });
		await usecase.execute(1);
		expect(placeStockService.updatePlaceStock).toHaveBeenCalledWith({ id: 1, data: {} });
	});

	it("UpdatePlaceStockUsecase updates qty branch", async () => {
		const placeStockService = { updatePlaceStock: jest.fn().mockResolvedValue({ id: 2 }) };
		const usecase = new UpdatePlaceStockUsecase({ placeStockService });
		await usecase.execute(2, { qty: 5 });
		expect(placeStockService.updatePlaceStock).toHaveBeenCalledWith({ id: 2, data: { qty: 5 } });
	});
});
