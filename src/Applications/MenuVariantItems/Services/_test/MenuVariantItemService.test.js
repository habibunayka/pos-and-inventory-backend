import { jest } from "@jest/globals";
import MenuVariantItemService from "../MenuVariantItemService.js";

describe("MenuVariantItemService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createMenuVariantItem: jest.fn(),
			updateMenuVariantItem: jest.fn(),
			deleteMenuVariantItem: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new MenuVariantItemService()).toThrow("MENUVARIANTITEM_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new MenuVariantItemService({ menuVariantItemRepository: badRepo })).toThrow(
			"MENUVARIANTITEM_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listMenuVariantItems should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new MenuVariantItemService({ menuVariantItemRepository: mockRepo });

		const result = service.listMenuVariantItems();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getMenuVariantItem should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new MenuVariantItemService({ menuVariantItemRepository: mockRepo });

		const result = service.getMenuVariantItem(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createMenuVariantItem should delegate to repository", async () => {
		mockRepo.createMenuVariantItem.mockResolvedValue({ id: 3 });
		const service = new MenuVariantItemService({ menuVariantItemRepository: mockRepo });

		const result = service.createMenuVariantItem({ name: "Large" });

		expect(mockRepo.createMenuVariantItem).toHaveBeenCalledWith({ name: "Large" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateMenuVariantItem should delegate to repository", async () => {
		mockRepo.updateMenuVariantItem.mockResolvedValue({ id: 4 });
		const service = new MenuVariantItemService({ menuVariantItemRepository: mockRepo });

		const result = service.updateMenuVariantItem({ id: 4, data: { name: "Small" } });

		expect(mockRepo.updateMenuVariantItem).toHaveBeenCalledWith({ id: 4, data: { name: "Small" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteMenuVariantItem should delegate to repository", async () => {
		mockRepo.deleteMenuVariantItem.mockResolvedValue(true);
		const service = new MenuVariantItemService({ menuVariantItemRepository: mockRepo });

		const result = service.deleteMenuVariantItem(5);

		expect(mockRepo.deleteMenuVariantItem).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
