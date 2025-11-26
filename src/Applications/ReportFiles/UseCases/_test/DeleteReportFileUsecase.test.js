import { jest } from "@jest/globals";
import DeleteReportFileUsecase from "../DeleteReportFileUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteReportFileUsecase", () => {
	let reportFileService;
	let usecase;

	beforeEach(() => {
		reportFileService = { deleteReportFile: jest.fn() };
		usecase = new DeleteReportFileUsecase({ reportFileService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteReportFileUsecase()).toThrow("REPORTFILE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		reportFileService.deleteReportFile.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Report file not found"));
	});

	test("should delete report file", async () => {
		reportFileService.deleteReportFile.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(reportFileService.deleteReportFile).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
