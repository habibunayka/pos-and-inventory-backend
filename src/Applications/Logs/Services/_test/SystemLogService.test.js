import { jest } from "@jest/globals";
import SystemLogService from "../SystemLogService.js";

describe("SystemLogService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createSystemLog: jest.fn(),
			deleteSystemLog: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new SystemLogService()).toThrow("SYSTEMLOG_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new SystemLogService({ systemLogRepository: badRepo })).toThrow(
			"SYSTEMLOG_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listSystemLogs should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new SystemLogService({ systemLogRepository: mockRepo });

		const result = service.listSystemLogs();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getSystemLog should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new SystemLogService({ systemLogRepository: mockRepo });

		const result = service.getSystemLog(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createSystemLog should delegate to repository", async () => {
		mockRepo.createSystemLog.mockResolvedValue({ id: 3 });
		const service = new SystemLogService({ systemLogRepository: mockRepo });

		const result = service.createSystemLog({ message: "err" });

		expect(mockRepo.createSystemLog).toHaveBeenCalledWith({ message: "err" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("deleteSystemLog should delegate to repository", async () => {
		mockRepo.deleteSystemLog.mockResolvedValue(true);
		const service = new SystemLogService({ systemLogRepository: mockRepo });

		const result = service.deleteSystemLog(4);

		expect(mockRepo.deleteSystemLog).toHaveBeenCalledWith(4);
		await expect(result).resolves.toBe(true);
	});
});
