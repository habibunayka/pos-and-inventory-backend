import { jest } from "@jest/globals";
import CreateReportFileUsecase from "../CreateReportFileUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateReportFileUsecase", () => {
	let reportFileService;
	let usecase;

	beforeEach(() => {
		reportFileService = { createReportFile: jest.fn() };
		usecase = new CreateReportFileUsecase({ reportFileService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateReportFileUsecase()).toThrow("REPORTFILE_USECASE.MISSING_SERVICE");
	});

	test("should throw when label missing", async () => {
		await expect(usecase.execute({ label: "   " })).rejects.toThrow(new ValidationError("label is required"));
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when filePath missing", async () => {
		await expect(usecase.execute({ label: "Label", filePath: "   " })).rejects.toThrow(
			new ValidationError("filePath is required")
		);
	});

	test("should create report file with normalized payload", async () => {
		const created = { id: 1 };
		reportFileService.createReportFile.mockResolvedValue(created);

		const result = await usecase.execute({
			label: "  Label ",
			filePath: "/path",
			mimeType: "text/plain",
			fileSize: 10,
			metaJson: { a: 1 }
		});

		expect(reportFileService.createReportFile).toHaveBeenCalledWith({
			label: "Label",
			filePath: "/path",
			mimeType: "text/plain",
			fileSize: 10,
			metaJson: { a: 1 }
		});
		expect(result).toEqual(created);
	});

	test("should allow optional metadata to be skipped", async () => {
		reportFileService.createReportFile.mockResolvedValue({});

		await usecase.execute({ label: "Minimal", filePath: "/tmp" });

		expect(reportFileService.createReportFile).toHaveBeenCalledWith({ label: "Minimal", filePath: "/tmp" });
	});
});
