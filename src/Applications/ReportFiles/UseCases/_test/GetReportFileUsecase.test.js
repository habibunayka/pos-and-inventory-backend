import { jest } from "@jest/globals";
import GetReportFileUsecase from "../GetReportFileUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetReportFileUsecase", () => {
	let reportFileService;
	let usecase;

	beforeEach(() => {
		reportFileService = { getReportFile: jest.fn() };
		usecase = new GetReportFileUsecase({ reportFileService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetReportFileUsecase()).toThrow("REPORTFILE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when report file not found", async () => {
		reportFileService.getReportFile.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Report file not found"));
	});

	test("should return report file when found", async () => {
		reportFileService.getReportFile.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(reportFileService.getReportFile).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
