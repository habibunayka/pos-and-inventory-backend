import { jest } from "@jest/globals";
import DeleteMenuVariantItemUsecase from "../DeleteMenuVariantItemUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteMenuVariantItemUsecase", () => {
	let menuVariantItemService;
	let usecase;

	beforeEach(() => {
		menuVariantItemService = { deleteMenuVariantItem: jest.fn() };
		usecase = new DeleteMenuVariantItemUsecase({ menuVariantItemService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteMenuVariantItemUsecase()).toThrow("MENUVARIANTITEM_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		menuVariantItemService.deleteMenuVariantItem.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Menu variant item not found"));
	});

	test("should delete menu variant item", async () => {
		menuVariantItemService.deleteMenuVariantItem.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(menuVariantItemService.deleteMenuVariantItem).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
