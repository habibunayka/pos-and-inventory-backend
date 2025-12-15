import { jest } from "@jest/globals";
import ListActivityLogsUsecase from "../ListActivityLogsUsecase.js";

describe("ListActivityLogsUsecase", () => {
	let activityLogService;
	let usecase;

	beforeEach(() => {
		activityLogService = { listActivityLogs: jest.fn() };
		usecase = new ListActivityLogsUsecase({ activityLogService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListActivityLogsUsecase()).toThrow("ACTIVITYLOG_USECASE.MISSING_SERVICE");
	});

	test("should list activity logs", async () => {
		const records = [{ id: 1 }];
		activityLogService.listActivityLogs.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(activityLogService.listActivityLogs).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
