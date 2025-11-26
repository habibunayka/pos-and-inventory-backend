import { jest } from "@jest/globals";
import DeleteMenuVariantUsecase from "../DeleteMenuVariantUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteMenuVariantUsecase", () => {
	let menuVariantService;
	let usecase;

	beforeEach(() => {
		menuVariantService = { deleteMenuVariant: jest.fn() };
		usecase = new DeleteMenuVariantUsecase({ menuVariantService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteMenuVariantUsecase()).toThrow("MENUVARIANT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		menuVariantService.deleteMenuVariant.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Menu variant not found"));
	});

	test("should delete menu variant", async () => {
		menuVariantService.deleteMenuVariant.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(menuVariantService.deleteMenuVariant).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
