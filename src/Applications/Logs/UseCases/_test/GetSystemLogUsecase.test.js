import { jest } from "@jest/globals";
import GetSystemLogUsecase from "../GetSystemLogUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetSystemLogUsecase", () => {
	let systemLogService;
	let usecase;

	beforeEach(() => {
		systemLogService = { getSystemLog: jest.fn() };
		usecase = new GetSystemLogUsecase({ systemLogService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetSystemLogUsecase()).toThrow("SYSTEMLOG_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when record not found", async () => {
		systemLogService.getSystemLog.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("System log not found"));
	});

	test("should return record when found", async () => {
		systemLogService.getSystemLog.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(systemLogService.getSystemLog).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
