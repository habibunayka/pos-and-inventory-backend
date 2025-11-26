import { jest } from "@jest/globals";
import GetMenuPriceUsecase from "../GetMenuPriceUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetMenuPriceUsecase", () => {
	let menuPriceService;
	let usecase;

	beforeEach(() => {
		menuPriceService = { getMenuPrice: jest.fn() };
		usecase = new GetMenuPriceUsecase({ menuPriceService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetMenuPriceUsecase()).toThrow("MENUPRICE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when record not found", async () => {
		menuPriceService.getMenuPrice.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Menu price not found"));
	});

	test("should return record when found", async () => {
		menuPriceService.getMenuPrice.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(menuPriceService.getMenuPrice).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
