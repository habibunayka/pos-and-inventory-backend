import * as usecases from "../index.js";
import ListReportFilesUsecase from "../ListReportFilesUsecase.js";
import GetReportFileUsecase from "../GetReportFileUsecase.js";
import CreateReportFileUsecase from "../CreateReportFileUsecase.js";
import UpdateReportFileUsecase from "../UpdateReportFileUsecase.js";
import DeleteReportFileUsecase from "../DeleteReportFileUsecase.js";

describe("ReportFiles Usecases index exports", () => {
	test("should export ListReportFilesUsecase", () => {
		expect(usecases.ListReportFilesUsecase).toBe(ListReportFilesUsecase);
	});

	test("should export GetReportFileUsecase", () => {
		expect(usecases.GetReportFileUsecase).toBe(GetReportFileUsecase);
	});

	test("should export CreateReportFileUsecase", () => {
		expect(usecases.CreateReportFileUsecase).toBe(CreateReportFileUsecase);
	});

	test("should export UpdateReportFileUsecase", () => {
		expect(usecases.UpdateReportFileUsecase).toBe(UpdateReportFileUsecase);
	});

	test("should export DeleteReportFileUsecase", () => {
		expect(usecases.DeleteReportFileUsecase).toBe(DeleteReportFileUsecase);
	});
});
