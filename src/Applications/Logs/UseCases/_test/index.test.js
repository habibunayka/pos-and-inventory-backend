import * as usecases from "../index.js";
import ListActivityLogsUsecase from "../ListActivityLogsUsecase.js";
import GetActivityLogUsecase from "../GetActivityLogUsecase.js";
import CreateActivityLogUsecase from "../CreateActivityLogUsecase.js";
import DeleteActivityLogUsecase from "../DeleteActivityLogUsecase.js";
import ListSystemLogsUsecase from "../ListSystemLogsUsecase.js";
import GetSystemLogUsecase from "../GetSystemLogUsecase.js";
import CreateSystemLogUsecase from "../CreateSystemLogUsecase.js";
import DeleteSystemLogUsecase from "../DeleteSystemLogUsecase.js";

describe("Logs Usecases index exports", () => {
	test("should export activity log usecases", () => {
		expect(usecases.ListActivityLogsUsecase).toBe(ListActivityLogsUsecase);
		expect(usecases.GetActivityLogUsecase).toBe(GetActivityLogUsecase);
		expect(usecases.CreateActivityLogUsecase).toBe(CreateActivityLogUsecase);
		expect(usecases.DeleteActivityLogUsecase).toBe(DeleteActivityLogUsecase);
	});

	test("should export system log usecases", () => {
		expect(usecases.ListSystemLogsUsecase).toBe(ListSystemLogsUsecase);
		expect(usecases.GetSystemLogUsecase).toBe(GetSystemLogUsecase);
		expect(usecases.CreateSystemLogUsecase).toBe(CreateSystemLogUsecase);
		expect(usecases.DeleteSystemLogUsecase).toBe(DeleteSystemLogUsecase);
	});
});
