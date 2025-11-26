import { jest } from "@jest/globals";
import UpdateMenuVariantUsecase from "../UpdateMenuVariantUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateMenuVariantUsecase", () => {
	let menuVariantService;
	let usecase;

	beforeEach(() => {
		menuVariantService = { updateMenuVariant: jest.fn() };
		usecase = new UpdateMenuVariantUsecase({ menuVariantService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateMenuVariantUsecase()).toThrow("MENUVARIANT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when record not found", async () => {
		menuVariantService.updateMenuVariant.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "New" })).rejects.toThrow(
			new ValidationError("Menu variant not found")
		);
	});

	test("should update menu variant with normalized data", async () => {
		const updated = { id: 2, name: "New" };
		menuVariantService.updateMenuVariant.mockResolvedValue(updated);

		const result = await usecase.execute("2", { menuId: "3", name: " New " });

		expect(menuVariantService.updateMenuVariant).toHaveBeenCalledWith({
			id: 2,
			data: { menuId: 3, name: "New" }
		});
		expect(result).toEqual(updated);
	});
});
