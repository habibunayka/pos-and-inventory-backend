import { jest } from "@jest/globals";
import UnitService from "../UnitService.js";

describe("UnitService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			findByName: jest.fn(),
			createUnit: jest.fn(),
			updateUnit: jest.fn(),
			deleteUnit: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new UnitService()).toThrow("UNIT_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new UnitService({ unitRepository: badRepo })).toThrow(
			"UNIT_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listUnits should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new UnitService({ unitRepository: mockRepo });

		const result = service.listUnits();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getUnit should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new UnitService({ unitRepository: mockRepo });

		const result = service.getUnit(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("getUnitByName should delegate to repository", async () => {
		mockRepo.findByName.mockResolvedValue({ id: 3 });
		const service = new UnitService({ unitRepository: mockRepo });

		const result = service.getUnitByName("gram");

		expect(mockRepo.findByName).toHaveBeenCalledWith("gram");
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("createUnit should delegate to repository", async () => {
		mockRepo.createUnit.mockResolvedValue({ id: 4 });
		const service = new UnitService({ unitRepository: mockRepo });

		const result = service.createUnit({ name: "gram" });

		expect(mockRepo.createUnit).toHaveBeenCalledWith({ name: "gram" });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("updateUnit should delegate to repository", async () => {
		mockRepo.updateUnit.mockResolvedValue({ id: 5 });
		const service = new UnitService({ unitRepository: mockRepo });

		const result = service.updateUnit({ id: 5, data: { name: "kg" } });

		expect(mockRepo.updateUnit).toHaveBeenCalledWith({ id: 5, data: { name: "kg" } });
		await expect(result).resolves.toEqual({ id: 5 });
	});

	test("deleteUnit should delegate to repository", async () => {
		mockRepo.deleteUnit.mockResolvedValue(true);
		const service = new UnitService({ unitRepository: mockRepo });

		const result = service.deleteUnit(6);

		expect(mockRepo.deleteUnit).toHaveBeenCalledWith(6);
		await expect(result).resolves.toBe(true);
	});
});
