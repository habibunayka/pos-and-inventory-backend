import { jest } from "@jest/globals";
import CreateActivityLogUsecase from "../CreateActivityLogUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateActivityLogUsecase", () => {
	let activityLogService;
	let usecase;

	beforeEach(() => {
		activityLogService = { createActivityLog: jest.fn() };
		usecase = new CreateActivityLogUsecase({ activityLogService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateActivityLogUsecase()).toThrow("ACTIVITYLOG_USECASE.MISSING_SERVICE");
	});

	test("should throw when action missing", async () => {
		await expect(usecase.execute({ action: "   " })).rejects.toThrow(
			new ValidationError("action is required")
		);
	});

	test("should create activity log with normalized payload", async () => {
		const created = { id: 1 };
		activityLogService.createActivityLog.mockResolvedValue(created);

		const result = await usecase.execute({
			action: "  LOGIN ",
			userId: "2",
			entityType: "user",
			entityId: "3",
			contextJson: { foo: "bar" }
		});

		expect(activityLogService.createActivityLog).toHaveBeenCalledWith({
			action: "LOGIN",
			userId: 2,
			entityType: "user",
			entityId: 3,
			contextJson: { foo: "bar" }
		});
		expect(result).toEqual(created);
	});

	test("should allow null optional fields", async () => {
		activityLogService.createActivityLog.mockResolvedValue({ id: 2 });

		await usecase.execute({ action: "LOGOUT", userId: null, entityId: null, contextJson: null });

		expect(activityLogService.createActivityLog).toHaveBeenCalledWith({
			action: "LOGOUT",
			userId: null,
			entityType: undefined,
			entityId: null,
			contextJson: null
		});
	});
});
