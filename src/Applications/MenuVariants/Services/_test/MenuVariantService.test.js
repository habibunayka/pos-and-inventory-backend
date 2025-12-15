import { jest } from "@jest/globals";
import MenuVariantService from "../MenuVariantService.js";

describe("MenuVariantService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createMenuVariant: jest.fn(),
			updateMenuVariant: jest.fn(),
			deleteMenuVariant: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new MenuVariantService()).toThrow("MENUVARIANT_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new MenuVariantService({ menuVariantRepository: badRepo })).toThrow(
			"MENUVARIANT_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listMenuVariants should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new MenuVariantService({ menuVariantRepository: mockRepo });

		const result = service.listMenuVariants();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getMenuVariant should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new MenuVariantService({ menuVariantRepository: mockRepo });

		const result = service.getMenuVariant(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createMenuVariant should delegate to repository", async () => {
		mockRepo.createMenuVariant.mockResolvedValue({ id: 3 });
		const service = new MenuVariantService({ menuVariantRepository: mockRepo });

		const result = service.createMenuVariant({ name: "Size" });

		expect(mockRepo.createMenuVariant).toHaveBeenCalledWith({ name: "Size" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateMenuVariant should delegate to repository", async () => {
		mockRepo.updateMenuVariant.mockResolvedValue({ id: 4 });
		const service = new MenuVariantService({ menuVariantRepository: mockRepo });

		const result = service.updateMenuVariant({ id: 4, data: { name: "Flavor" } });

		expect(mockRepo.updateMenuVariant).toHaveBeenCalledWith({ id: 4, data: { name: "Flavor" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteMenuVariant should delegate to repository", async () => {
		mockRepo.deleteMenuVariant.mockResolvedValue(true);
		const service = new MenuVariantService({ menuVariantRepository: mockRepo });

		const result = service.deleteMenuVariant(5);

		expect(mockRepo.deleteMenuVariant).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
