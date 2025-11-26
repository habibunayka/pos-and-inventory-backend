import { jest } from "@jest/globals";
import ListMenuPricesUsecase from "../ListMenuPricesUsecase.js";

describe("ListMenuPricesUsecase", () => {
	let menuPriceService;
	let usecase;

	beforeEach(() => {
		menuPriceService = { listMenuPrices: jest.fn() };
		usecase = new ListMenuPricesUsecase({ menuPriceService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListMenuPricesUsecase()).toThrow("MENUPRICE_USECASE.MISSING_SERVICE");
	});

	test("should list menu prices", async () => {
		const records = [{ id: 1 }];
		menuPriceService.listMenuPrices.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(menuPriceService.listMenuPrices).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
