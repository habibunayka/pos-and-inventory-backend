import { jest } from "@jest/globals";
import CreateSystemLogUsecase from "../CreateSystemLogUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateSystemLogUsecase", () => {
	let systemLogService;
	let usecase;

	beforeEach(() => {
		systemLogService = { createSystemLog: jest.fn() };
		usecase = new CreateSystemLogUsecase({ systemLogService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateSystemLogUsecase()).toThrow("SYSTEMLOG_USECASE.MISSING_SERVICE");
	});

	test("should throw when message missing", async () => {
		await expect(usecase.execute({ message: "   " })).rejects.toThrow(new ValidationError("message is required"));
	});

	test("should create system log with normalized payload", async () => {
		const created = { id: 1 };
		systemLogService.createSystemLog.mockResolvedValue(created);

		const result = await usecase.execute({
			message: "  Error ",
			level: "warn",
			contextJson: { foo: "bar" }
		});

		expect(systemLogService.createSystemLog).toHaveBeenCalledWith({
			message: "Error",
			level: "warn",
			contextJson: { foo: "bar" }
		});
		expect(result).toEqual(created);
	});

	test("should allow null optional fields", async () => {
		systemLogService.createSystemLog.mockResolvedValue({ id: 2 });

		await usecase.execute({ message: "OK", level: null, contextJson: null });

		expect(systemLogService.createSystemLog).toHaveBeenCalledWith({
			message: "OK",
			level: null,
			contextJson: null
		});
	});
});
