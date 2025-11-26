import { jest } from "@jest/globals";
import GetMenuVariantItemUsecase from "../GetMenuVariantItemUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetMenuVariantItemUsecase", () => {
	let menuVariantItemService;
	let usecase;

	beforeEach(() => {
		menuVariantItemService = { getMenuVariantItem: jest.fn() };
		usecase = new GetMenuVariantItemUsecase({ menuVariantItemService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetMenuVariantItemUsecase()).toThrow("MENUVARIANTITEM_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when record not found", async () => {
		menuVariantItemService.getMenuVariantItem.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Menu variant item not found"));
	});

	test("should return record when found", async () => {
		menuVariantItemService.getMenuVariantItem.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(menuVariantItemService.getMenuVariantItem).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
