import { jest } from "@jest/globals";
import ShiftService from "../ShiftService.js";

describe("ShiftService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createShift: jest.fn(),
			updateShift: jest.fn(),
			deleteShift: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new ShiftService()).toThrow("SHIFT_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new ShiftService({ shiftRepository: badRepo })).toThrow(
			"SHIFT_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listShifts should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new ShiftService({ shiftRepository: mockRepo });

		const result = service.listShifts();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getShift should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new ShiftService({ shiftRepository: mockRepo });

		const result = service.getShift(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createShift should delegate to repository", async () => {
		mockRepo.createShift.mockResolvedValue({ id: 3 });
		const service = new ShiftService({ shiftRepository: mockRepo });

		const result = service.createShift({ name: "Morning" });

		expect(mockRepo.createShift).toHaveBeenCalledWith({ name: "Morning" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateShift should delegate to repository", async () => {
		mockRepo.updateShift.mockResolvedValue({ id: 4 });
		const service = new ShiftService({ shiftRepository: mockRepo });

		const result = service.updateShift({ id: 4, data: { name: "Evening" } });

		expect(mockRepo.updateShift).toHaveBeenCalledWith({ id: 4, data: { name: "Evening" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteShift should delegate to repository", async () => {
		mockRepo.deleteShift.mockResolvedValue(true);
		const service = new ShiftService({ shiftRepository: mockRepo });

		const result = service.deleteShift(5);

		expect(mockRepo.deleteShift).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
