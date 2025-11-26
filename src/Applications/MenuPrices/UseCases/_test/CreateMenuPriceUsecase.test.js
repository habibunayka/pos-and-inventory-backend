import { jest } from "@jest/globals";
import CreateMenuPriceUsecase from "../CreateMenuPriceUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateMenuPriceUsecase", () => {
	let menuPriceService;
	let usecase;

	beforeEach(() => {
		menuPriceService = { createMenuPrice: jest.fn() };
		usecase = new CreateMenuPriceUsecase({ menuPriceService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateMenuPriceUsecase()).toThrow("MENUPRICE_USECASE.MISSING_SERVICE");
	});

	test("should throw when price is not number", async () => {
		await expect(usecase.execute({ menuId: 1, price: "abc" })).rejects.toThrow(
			new ValidationError("price must be a number")
		);
	});

	test("should create menu price with normalized data", async () => {
		const created = { id: 1 };
		menuPriceService.createMenuPrice.mockResolvedValue(created);

		const result = await usecase.execute({ menuId: "2", price: "100", effectiveDate: "2023-01-01T00:00:00.000Z" });

		expect(menuPriceService.createMenuPrice).toHaveBeenCalledWith({
			menuId: 2,
			price: 100,
			effectiveDate: expect.any(Date)
		});
		expect(result).toEqual(created);
	});
});
