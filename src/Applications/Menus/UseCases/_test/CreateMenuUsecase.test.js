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
});
