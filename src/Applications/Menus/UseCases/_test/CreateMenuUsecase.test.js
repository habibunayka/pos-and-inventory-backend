import { jest } from "@jest/globals";
import CreateMenuUsecase from "../CreateMenuUsecase.js";

describe("CreateMenuUsecase", () => {
	let menuService;
	let usecase;

	beforeEach(() => {
		menuService = { createMenu: jest.fn() };
		usecase = new CreateMenuUsecase({ menuService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateMenuUsecase()).toThrow("MENU_USECASE.MISSING_SERVICE");
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ name: "   " })).rejects.toThrow("name is required");
	});

	test("should create menu with normalized payload", async () => {
		const created = { id: 1 };
		menuService.createMenu.mockResolvedValue(created);

		const result = await usecase.execute({
			name: "  Nasi ",
			placeId: "2",
			categoryId: "3",
			description: null,
			isActive: true
		});

		expect(menuService.createMenu).toHaveBeenCalledWith({
			name: "Nasi",
			placeId: 2,
			categoryId: 3,
			description: null,
			isActive: true
		});
		expect(result).toEqual(created);
	});

	test("should include sku when provided", async () => {
		menuService.createMenu.mockResolvedValue({});

		await usecase.execute({ name: "SkuMenu", sku: " SKU-1 " });
		expect(menuService.createMenu).toHaveBeenLastCalledWith({ name: "SkuMenu", sku: " SKU-1 " });

		await usecase.execute({ name: "SkuMenu", sku: null });
		expect(menuService.createMenu).toHaveBeenLastCalledWith({ name: "SkuMenu", sku: null });
	});

	test("should allow optional fields to be skipped", async () => {
		menuService.createMenu.mockResolvedValue({});

		await usecase.execute({ name: "Simple" });

		expect(menuService.createMenu).toHaveBeenCalledWith({ name: "Simple" });
	});

	test("should normalize description and accept falsy isActive", async () => {
		await usecase.execute({ name: "Desc", description: "   ", isActive: false });

		expect(menuService.createMenu).toHaveBeenLastCalledWith({
			name: "Desc",
			description: "   ",
			isActive: false
		});
	});

	test("should ignore null place and category ids", async () => {
		await usecase.execute({ name: "SkipIds", placeId: null, categoryId: null });
		expect(menuService.createMenu).toHaveBeenLastCalledWith({ name: "SkipIds" });
	});
});
