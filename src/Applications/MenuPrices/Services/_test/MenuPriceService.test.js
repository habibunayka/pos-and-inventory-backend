import { jest } from "@jest/globals";
import MenuPriceService from "../MenuPriceService.js";

describe("MenuPriceService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createMenuPrice: jest.fn(),
			updateMenuPrice: jest.fn(),
			deleteMenuPrice: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new MenuPriceService()).toThrow("MENUPRICE_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new MenuPriceService({ menuPriceRepository: badRepo })).toThrow(
			"MENUPRICE_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listMenuPrices should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new MenuPriceService({ menuPriceRepository: mockRepo });

		const result = service.listMenuPrices();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getMenuPrice should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new MenuPriceService({ menuPriceRepository: mockRepo });

		const result = service.getMenuPrice(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createMenuPrice should delegate to repository", async () => {
		mockRepo.createMenuPrice.mockResolvedValue({ id: 3 });
		const service = new MenuPriceService({ menuPriceRepository: mockRepo });

		const result = service.createMenuPrice({ price: 100 });

		expect(mockRepo.createMenuPrice).toHaveBeenCalledWith({ price: 100 });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateMenuPrice should delegate to repository", async () => {
		mockRepo.updateMenuPrice.mockResolvedValue({ id: 4 });
		const service = new MenuPriceService({ menuPriceRepository: mockRepo });

		const result = service.updateMenuPrice({ id: 4, data: { price: 200 } });

		expect(mockRepo.updateMenuPrice).toHaveBeenCalledWith({ id: 4, data: { price: 200 } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteMenuPrice should delegate to repository", async () => {
		mockRepo.deleteMenuPrice.mockResolvedValue(true);
		const service = new MenuPriceService({ menuPriceRepository: mockRepo });

		const result = service.deleteMenuPrice(5);

		expect(mockRepo.deleteMenuPrice).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
