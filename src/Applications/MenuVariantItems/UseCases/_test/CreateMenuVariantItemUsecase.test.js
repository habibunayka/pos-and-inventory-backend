import { jest } from "@jest/globals";
import CreateMenuVariantItemUsecase from "../CreateMenuVariantItemUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateMenuVariantItemUsecase", () => {
	let menuVariantItemService;
	let usecase;

	beforeEach(() => {
		menuVariantItemService = { createMenuVariantItem: jest.fn() };
		usecase = new CreateMenuVariantItemUsecase({ menuVariantItemService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateMenuVariantItemUsecase()).toThrow("MENUVARIANTITEM_USECASE.MISSING_SERVICE");
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ menuVariantId: 1, name: "   " })).rejects.toThrow(
			new ValidationError("name is required")
		);
	});

	test("should throw when additionalPrice invalid", async () => {
		await expect(usecase.execute({ menuVariantId: 1, name: "Size", additionalPrice: "abc" })).rejects.toThrow(
			new ValidationError("additionalPrice must be a number")
		);
	});

	test("should create menu variant item with normalized data", async () => {
		const created = { id: 1 };
		menuVariantItemService.createMenuVariantItem.mockResolvedValue(created);

		const result = await usecase.execute({ menuVariantId: "2", name: " Large ", additionalPrice: "10" });

		expect(menuVariantItemService.createMenuVariantItem).toHaveBeenCalledWith({
			menuVariantId: 2,
			name: "Large",
			additionalPrice: 10
		});
		expect(result).toEqual(created);
	});

	test("should validate default payload", async () => {
		await expect(usecase.execute()).rejects.toThrow(
			new ValidationError("menuVariantId must be a positive integer")
		);
	});
});
