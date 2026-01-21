import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateMenuPriceUsecase from "../CreateMenuPriceUsecase.js";
import UpdateMenuPriceUsecase from "../UpdateMenuPriceUsecase.js";

describe("MenuPrices usecase branch coverage", () => {
	it("CreateMenuPriceUsecase default arg branch", async () => {
		const usecase = new CreateMenuPriceUsecase({ menuPriceService: { createMenuPrice: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("UpdateMenuPriceUsecase default arg branch", async () => {
		const usecase = new UpdateMenuPriceUsecase({ menuPriceService: { updateMenuPrice: jest.fn() } });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);
	});
});
