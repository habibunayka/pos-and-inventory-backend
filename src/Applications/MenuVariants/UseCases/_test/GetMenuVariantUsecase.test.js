import { jest } from "@jest/globals";
import GetMenuVariantUsecase from "../GetMenuVariantUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetMenuVariantUsecase", () => {
	let menuVariantService;
	let usecase;

	beforeEach(() => {
		menuVariantService = { getMenuVariant: jest.fn() };
		usecase = new GetMenuVariantUsecase({ menuVariantService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetMenuVariantUsecase()).toThrow("MENUVARIANT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when record not found", async () => {
		menuVariantService.getMenuVariant.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Menu variant not found"));
	});

	test("should return record when found", async () => {
		menuVariantService.getMenuVariant.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(menuVariantService.getMenuVariant).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
