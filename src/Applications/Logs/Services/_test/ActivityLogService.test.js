import { jest } from "@jest/globals";
import ActivityLogService from "../ActivityLogService.js";

describe("ActivityLogService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createActivityLog: jest.fn(),
			deleteActivityLog: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new ActivityLogService()).toThrow("ACTIVITYLOG_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new ActivityLogService({ activityLogRepository: badRepo })).toThrow(
			"ACTIVITYLOG_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listActivityLogs should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new ActivityLogService({ activityLogRepository: mockRepo });

		const result = service.listActivityLogs();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getActivityLog should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new ActivityLogService({ activityLogRepository: mockRepo });

		const result = service.getActivityLog(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createActivityLog should delegate to repository", async () => {
		mockRepo.createActivityLog.mockResolvedValue({ id: 3 });
		const service = new ActivityLogService({ activityLogRepository: mockRepo });

		const result = service.createActivityLog({ action: "do" });

		expect(mockRepo.createActivityLog).toHaveBeenCalledWith({ action: "do" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("deleteActivityLog should delegate to repository", async () => {
		mockRepo.deleteActivityLog.mockResolvedValue(true);
		const service = new ActivityLogService({ activityLogRepository: mockRepo });

		const result = service.deleteActivityLog(4);

		expect(mockRepo.deleteActivityLog).toHaveBeenCalledWith(4);
		await expect(result).resolves.toBe(true);
	});
});
