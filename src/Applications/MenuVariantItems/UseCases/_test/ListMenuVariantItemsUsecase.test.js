import { jest } from "@jest/globals";
import ListMenuVariantItemsUsecase from "../ListMenuVariantItemsUsecase.js";

describe("ListMenuVariantItemsUsecase", () => {
	let menuVariantItemService;
	let usecase;

	beforeEach(() => {
		menuVariantItemService = { listMenuVariantItems: jest.fn() };
		usecase = new ListMenuVariantItemsUsecase({ menuVariantItemService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListMenuVariantItemsUsecase()).toThrow("MENUVARIANTITEM_USECASE.MISSING_SERVICE");
	});

	test("should list menu variant items", async () => {
		const records = [{ id: 1 }];
		menuVariantItemService.listMenuVariantItems.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(menuVariantItemService.listMenuVariantItems).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
