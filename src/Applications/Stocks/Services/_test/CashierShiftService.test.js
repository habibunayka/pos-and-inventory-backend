import { jest } from "@jest/globals";
import CashierShiftService from "../CashierShiftService.js";

describe("CashierShiftService", () => {
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
		expect(() => new CashierShiftService()).toThrow("CASHIER_SHIFT_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new CashierShiftService({ cashierShiftRepository: badRepo })).toThrow(
			"CASHIER_SHIFT_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("list should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new CashierShiftService({ cashierShiftRepository: mockRepo });

		const result = service.list();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("get should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new CashierShiftService({ cashierShiftRepository: mockRepo });

		const result = service.get(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("create should delegate to repository", async () => {
		mockRepo.createShift.mockResolvedValue({ id: 3 });
		const service = new CashierShiftService({ cashierShiftRepository: mockRepo });

		const result = service.create({ foo: "bar" });

		expect(mockRepo.createShift).toHaveBeenCalledWith({ foo: "bar" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("update should delegate to repository", async () => {
		mockRepo.updateShift.mockResolvedValue({ id: 4 });
		const service = new CashierShiftService({ cashierShiftRepository: mockRepo });

		const result = service.update({ id: 4, data: { total: 10 } });

		expect(mockRepo.updateShift).toHaveBeenCalledWith({ id: 4, data: { total: 10 } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("delete should delegate to repository", async () => {
		mockRepo.deleteShift.mockResolvedValue(true);
		const service = new CashierShiftService({ cashierShiftRepository: mockRepo });

		const result = service.delete(5);

		expect(mockRepo.deleteShift).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
