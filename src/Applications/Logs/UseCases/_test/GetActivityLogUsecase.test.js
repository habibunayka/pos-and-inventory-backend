import { jest } from "@jest/globals";
import GetActivityLogUsecase from "../GetActivityLogUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetActivityLogUsecase", () => {
	let activityLogService;
	let usecase;

	beforeEach(() => {
		activityLogService = { getActivityLog: jest.fn() };
		usecase = new GetActivityLogUsecase({ activityLogService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetActivityLogUsecase()).toThrow("ACTIVITYLOG_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when record not found", async () => {
		activityLogService.getActivityLog.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Activity log not found"));
	});

	test("should return record when found", async () => {
		activityLogService.getActivityLog.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(activityLogService.getActivityLog).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
