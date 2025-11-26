import { jest } from "@jest/globals";
import WasteService from "../WasteService.js";

describe("WasteService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createWaste: jest.fn(),
			updateWaste: jest.fn(),
			deleteWaste: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new WasteService()).toThrow("WASTE_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new WasteService({ wasteRepository: badRepo })).toThrow(
			"WASTE_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("list should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new WasteService({ wasteRepository: mockRepo });

		const result = service.list();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("get should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new WasteService({ wasteRepository: mockRepo });

		const result = service.get(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("create should delegate to repository", async () => {
		mockRepo.createWaste.mockResolvedValue({ id: 3 });
		const service = new WasteService({ wasteRepository: mockRepo });

		const result = service.create({ foo: "bar" });

		expect(mockRepo.createWaste).toHaveBeenCalledWith({ foo: "bar" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("update should delegate to repository", async () => {
		mockRepo.updateWaste.mockResolvedValue({ id: 4 });
		const service = new WasteService({ wasteRepository: mockRepo });

		const result = service.update({ id: 4, data: { qty: 5 } });

		expect(mockRepo.updateWaste).toHaveBeenCalledWith({ id: 4, data: { qty: 5 } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("delete should delegate to repository", async () => {
		mockRepo.deleteWaste.mockResolvedValue(true);
		const service = new WasteService({ wasteRepository: mockRepo });

		const result = service.delete(5);

		expect(mockRepo.deleteWaste).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
