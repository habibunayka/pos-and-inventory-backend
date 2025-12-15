import { jest } from "@jest/globals";
import ListReportFilesUsecase from "../ListReportFilesUsecase.js";

describe("ListReportFilesUsecase", () => {
	let reportFileService;
	let usecase;

	beforeEach(() => {
		reportFileService = { listReportFiles: jest.fn() };
		usecase = new ListReportFilesUsecase({ reportFileService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListReportFilesUsecase()).toThrow("REPORTFILE_USECASE.MISSING_SERVICE");
	});

	test("should list report files", async () => {
		const records = [{ id: 1 }];
		reportFileService.listReportFiles.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(reportFileService.listReportFiles).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
