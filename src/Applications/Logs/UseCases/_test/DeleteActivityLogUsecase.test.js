import { jest } from "@jest/globals";
import DeleteActivityLogUsecase from "../DeleteActivityLogUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteActivityLogUsecase", () => {
	let activityLogService;
	let usecase;

	beforeEach(() => {
		activityLogService = { deleteActivityLog: jest.fn() };
		usecase = new DeleteActivityLogUsecase({ activityLogService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteActivityLogUsecase()).toThrow("ACTIVITYLOG_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		activityLogService.deleteActivityLog.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Activity log not found"));
	});

	test("should delete activity log", async () => {
		activityLogService.deleteActivityLog.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(activityLogService.deleteActivityLog).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
