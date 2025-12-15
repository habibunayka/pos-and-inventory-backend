import { jest } from "@jest/globals";
import ListSystemLogsUsecase from "../ListSystemLogsUsecase.js";

describe("ListSystemLogsUsecase", () => {
	let systemLogService;
	let usecase;

	beforeEach(() => {
		systemLogService = { listSystemLogs: jest.fn() };
		usecase = new ListSystemLogsUsecase({ systemLogService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListSystemLogsUsecase()).toThrow("SYSTEMLOG_USECASE.MISSING_SERVICE");
	});

	test("should list system logs", async () => {
		const records = [{ id: 1 }];
		systemLogService.listSystemLogs.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(systemLogService.listSystemLogs).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
