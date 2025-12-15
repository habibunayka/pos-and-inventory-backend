import { jest } from "@jest/globals";
import DeleteSystemLogUsecase from "../DeleteSystemLogUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteSystemLogUsecase", () => {
	let systemLogService;
	let usecase;

	beforeEach(() => {
		systemLogService = { deleteSystemLog: jest.fn() };
		usecase = new DeleteSystemLogUsecase({ systemLogService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteSystemLogUsecase()).toThrow("SYSTEMLOG_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		systemLogService.deleteSystemLog.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("System log not found"));
	});

	test("should delete system log", async () => {
		systemLogService.deleteSystemLog.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(systemLogService.deleteSystemLog).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
