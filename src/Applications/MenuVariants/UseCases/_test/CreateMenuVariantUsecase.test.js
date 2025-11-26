import { jest } from "@jest/globals";
import CreateMenuVariantUsecase from "../CreateMenuVariantUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateMenuVariantUsecase", () => {
	let menuVariantService;
	let usecase;

	beforeEach(() => {
		menuVariantService = { createMenuVariant: jest.fn() };
		usecase = new CreateMenuVariantUsecase({ menuVariantService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateMenuVariantUsecase()).toThrow("MENUVARIANT_USECASE.MISSING_SERVICE");
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ menuId: 1, name: "   " })).rejects.toThrow(
			new ValidationError("name is required")
		);
	});

	test("should create menu variant with normalized data", async () => {
		const created = { id: 1 };
		menuVariantService.createMenuVariant.mockResolvedValue(created);

		const result = await usecase.execute({ menuId: "2", name: " Size " });

		expect(menuVariantService.createMenuVariant).toHaveBeenCalledWith({ menuId: 2, name: "Size" });
		expect(result).toEqual(created);
	});
});
