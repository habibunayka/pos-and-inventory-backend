import { jest } from "@jest/globals";
import UpdateReportFileUsecase from "../UpdateReportFileUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateReportFileUsecase", () => {
	let reportFileService;
	let usecase;

	beforeEach(() => {
		reportFileService = { updateReportFile: jest.fn() };
		usecase = new UpdateReportFileUsecase({ reportFileService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateReportFileUsecase()).toThrow("REPORTFILE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when fileSize invalid", async () => {
		await expect(usecase.execute(1, { fileSize: "abc" })).rejects.toThrow(
			new ValidationError("fileSize must be a number")
		);
	});

	test("should throw when record not found", async () => {
		reportFileService.updateReportFile.mockResolvedValue(null);

		await expect(usecase.execute(1, { label: "New" })).rejects.toThrow(
			new ValidationError("Report file not found")
		);
	});

	test("should update report file with normalized payload", async () => {
		const updated = { id: 2, label: "New" };
		reportFileService.updateReportFile.mockResolvedValue(updated);

		const result = await usecase.execute("2", {
			label: " New ",
			filePath: "/new",
			mimeType: "text/plain",
			fileSize: "10",
			metaJson: null
		});

		expect(reportFileService.updateReportFile).toHaveBeenCalledWith({
			id: 2,
			data: { label: "New", filePath: "/new", mimeType: "text/plain", fileSize: 10, metaJson: null }
		});
		expect(result).toEqual(updated);
	});
});
