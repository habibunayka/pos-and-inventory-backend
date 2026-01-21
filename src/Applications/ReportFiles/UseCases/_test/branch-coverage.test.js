import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateReportFileUsecase from "../CreateReportFileUsecase.js";
import UpdateReportFileUsecase from "../UpdateReportFileUsecase.js";

describe("ReportFiles usecase branch coverage", () => {
	it("CreateReportFileUsecase default arg branch", async () => {
		const usecase = new CreateReportFileUsecase({ reportFileService: { createReportFile: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateReportFileUsecase validates filePath", async () => {
		const usecase = new CreateReportFileUsecase({ reportFileService: { createReportFile: jest.fn() } });
		await expect(usecase.execute({ label: "Report" })).rejects.toThrow(ValidationError);
	});

	it("UpdateReportFileUsecase handles defaults and null labels", async () => {
		const reportFileService = { updateReportFile: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new UpdateReportFileUsecase({ reportFileService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);

		await usecase.execute(1, { label: null, filePath: null });
		expect(reportFileService.updateReportFile).toHaveBeenCalledWith({
			id: 1,
			data: { label: "", filePath: "" }
		});
	});
});
