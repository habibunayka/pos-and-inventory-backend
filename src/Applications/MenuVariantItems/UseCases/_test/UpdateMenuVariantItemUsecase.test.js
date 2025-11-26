import { jest } from "@jest/globals";
import UpdateMenuVariantItemUsecase from "../UpdateMenuVariantItemUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateMenuVariantItemUsecase", () => {
	let menuVariantItemService;
	let usecase;

	beforeEach(() => {
		menuVariantItemService = { updateMenuVariantItem: jest.fn() };
		usecase = new UpdateMenuVariantItemUsecase({ menuVariantItemService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateMenuVariantItemUsecase()).toThrow("MENUVARIANTITEM_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when additionalPrice invalid", async () => {
		await expect(usecase.execute(1, { additionalPrice: "abc" })).rejects.toThrow(
			new ValidationError("additionalPrice must be a number")
		);
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when record not found", async () => {
		menuVariantItemService.updateMenuVariantItem.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "Small" })).rejects.toThrow(
			new ValidationError("Menu variant item not found")
		);
	});

	test("should update menu variant item with normalized data", async () => {
		const updated = { id: 2, name: "Small" };
		menuVariantItemService.updateMenuVariantItem.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			menuVariantId: "3",
			name: " Small ",
			additionalPrice: "5"
		});

		expect(menuVariantItemService.updateMenuVariantItem).toHaveBeenCalledWith({
			id: 2,
			data: { menuVariantId: 3, name: "Small", additionalPrice: 5 }
		});
		expect(result).toEqual(updated);
	});
});
