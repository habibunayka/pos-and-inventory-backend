import { jest } from "@jest/globals";
import UpdateMenuUsecase from "../UpdateMenuUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateMenuUsecase", () => {
	let menuService;
	let usecase;

	beforeEach(() => {
		menuService = { updateMenu: jest.fn() };
		usecase = new UpdateMenuUsecase({ menuService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateMenuUsecase()).toThrow("MENU_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when record not found", async () => {
		menuService.updateMenu.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "New" })).rejects.toThrow(new ValidationError("Menu not found"));
	});

	test("should update menu with normalized data", async () => {
		const updated = { id: 2, name: "New" };
		menuService.updateMenu.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			name: " New ",
			description: null,
			isActive: true,
			placeId: "3",
			categoryId: "4"
		});

		expect(menuService.updateMenu).toHaveBeenCalledWith({
			id: 2,
			data: {
				name: "New",
				description: null,
				isActive: true,
				placeId: 3,
				categoryId: 4
			}
		});
		expect(result).toEqual(updated);
	});

	test("should include sku when provided", async () => {
		menuService.updateMenu.mockResolvedValue({ id: 3 });

		await usecase.execute(3, { sku: "SKU-2" });
		expect(menuService.updateMenu).toHaveBeenLastCalledWith({ id: 3, data: { sku: "SKU-2" } });

		await usecase.execute(3, { sku: null });
		expect(menuService.updateMenu).toHaveBeenLastCalledWith({ id: 3, data: { sku: null } });
	});
});
