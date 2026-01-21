import { describe, expect, it } from "@jest/globals";
import ActivityLogService from "../ActivityLogService.js";
import SystemLogService from "../SystemLogService.js";
import ActivityLogRepository from "../../../../Domains/Logs/Repositories/ActivityLogRepository.js";
import SystemLogRepository from "../../../../Domains/Logs/Repositories/SystemLogRepository.js";

describe("Logs services constructor coverage", () => {
	const cases = [
		{ Service: ActivityLogService, Repo: ActivityLogRepository, key: "activityLogRepository" },
		{ Service: SystemLogService, Repo: SystemLogRepository, key: "systemLogRepository" }
	];

	it.each(cases)("accepts repository instance for %p", ({ Service, Repo, key }) => {
		const repo = new Repo();
		const service = new Service({ [key]: repo });
		expect(service).toBeInstanceOf(Service);
	});
});
