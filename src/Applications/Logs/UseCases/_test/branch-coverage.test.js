import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateActivityLogUsecase from "../CreateActivityLogUsecase.js";
import CreateSystemLogUsecase from "../CreateSystemLogUsecase.js";

describe("Logs usecase branch coverage", () => {
	it("CreateSystemLogUsecase skips optional fields", async () => {
		const systemLogService = { createSystemLog: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateSystemLogUsecase({ systemLogService });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
		await usecase.execute({ message: "ok" });
		expect(systemLogService.createSystemLog).toHaveBeenCalledWith({ message: "ok" });
	});

	it("CreateActivityLogUsecase default arg branch", async () => {
		const usecase = new CreateActivityLogUsecase({ activityLogService: { createActivityLog: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateActivityLogUsecase allows null entityType", async () => {
		const activityLogService = { createActivityLog: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateActivityLogUsecase({ activityLogService });

		await usecase.execute({ action: "login", entityType: null });

		expect(activityLogService.createActivityLog).toHaveBeenLastCalledWith({
			action: "login",
			entityType: null
		});
	});
});
