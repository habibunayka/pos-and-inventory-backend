import { jest } from "@jest/globals";
import DeleteMenuPriceUsecase from "../DeleteMenuPriceUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteMenuPriceUsecase", () => {
	let menuPriceService;
	let usecase;

	beforeEach(() => {
		menuPriceService = { deleteMenuPrice: jest.fn() };
		usecase = new DeleteMenuPriceUsecase({ menuPriceService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteMenuPriceUsecase()).toThrow("MENUPRICE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		menuPriceService.deleteMenuPrice.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Menu price not found"));
	});

	test("should delete menu price", async () => {
		menuPriceService.deleteMenuPrice.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(menuPriceService.deleteMenuPrice).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
