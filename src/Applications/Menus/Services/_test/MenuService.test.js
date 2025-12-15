import { jest } from "@jest/globals";
import MenuService from "../MenuService.js";

describe("MenuService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createMenu: jest.fn(),
			updateMenu: jest.fn(),
			deleteMenu: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new MenuService()).toThrow("MENU_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new MenuService({ menuRepository: badRepo })).toThrow(
			"MENU_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listMenus should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new MenuService({ menuRepository: mockRepo });

		const result = service.listMenus();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getMenu should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new MenuService({ menuRepository: mockRepo });

		const result = service.getMenu(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createMenu should delegate to repository", async () => {
		mockRepo.createMenu.mockResolvedValue({ id: 3 });
		const service = new MenuService({ menuRepository: mockRepo });

		const result = service.createMenu({ name: "Nasi" });

		expect(mockRepo.createMenu).toHaveBeenCalledWith({ name: "Nasi" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateMenu should delegate to repository", async () => {
		mockRepo.updateMenu.mockResolvedValue({ id: 4 });
		const service = new MenuService({ menuRepository: mockRepo });

		const result = service.updateMenu({ id: 4, data: { name: "New" } });

		expect(mockRepo.updateMenu).toHaveBeenCalledWith({ id: 4, data: { name: "New" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteMenu should delegate to repository", async () => {
		mockRepo.deleteMenu.mockResolvedValue(true);
		const service = new MenuService({ menuRepository: mockRepo });

		const result = service.deleteMenu(5);

		expect(mockRepo.deleteMenu).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
