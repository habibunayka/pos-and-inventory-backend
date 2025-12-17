import { jest } from "@jest/globals";
import UpdateMenuPriceUsecase from "../UpdateMenuPriceUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateMenuPriceUsecase", () => {
	let menuPriceService;
	let usecase;

	beforeEach(() => {
		menuPriceService = { updateMenuPrice: jest.fn() };
		usecase = new UpdateMenuPriceUsecase({ menuPriceService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateMenuPriceUsecase()).toThrow("MENUPRICE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when price invalid", async () => {
		await expect(usecase.execute(1, { price: "abc" })).rejects.toThrow(
			new ValidationError("price must be a number")
		);
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when record not found", async () => {
		menuPriceService.updateMenuPrice.mockResolvedValue(null);

		await expect(usecase.execute(1, { price: 10 })).rejects.toThrow(new ValidationError("Menu price not found"));
	});

	test("should update menu price with normalized data", async () => {
		const updated = { id: 2, price: 150 };
		menuPriceService.updateMenuPrice.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			menuId: "3",
			price: "150",
			effectiveDate: "2023-01-01T00:00:00.000Z"
		});

		expect(menuPriceService.updateMenuPrice).toHaveBeenCalledWith({
			id: 2,
			data: { menuId: 3, price: 150, effectiveDate: expect.any(Date) }
		});
		expect(result).toEqual(updated);
	});
});
