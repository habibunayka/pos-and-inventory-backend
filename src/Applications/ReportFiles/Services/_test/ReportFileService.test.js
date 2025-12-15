import { jest } from "@jest/globals";
import ReportFileService from "../ReportFileService.js";

describe("ReportFileService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createReportFile: jest.fn(),
			updateReportFile: jest.fn(),
			deleteReportFile: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new ReportFileService()).toThrow("REPORTFILE_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new ReportFileService({ reportFileRepository: badRepo })).toThrow(
			"REPORTFILE_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listReportFiles should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new ReportFileService({ reportFileRepository: mockRepo });

		const result = service.listReportFiles();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getReportFile should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new ReportFileService({ reportFileRepository: mockRepo });

		const result = service.getReportFile(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createReportFile should delegate to repository", async () => {
		mockRepo.createReportFile.mockResolvedValue({ id: 3 });
		const service = new ReportFileService({ reportFileRepository: mockRepo });

		const result = service.createReportFile({ name: "report" });

		expect(mockRepo.createReportFile).toHaveBeenCalledWith({ name: "report" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateReportFile should delegate to repository", async () => {
		mockRepo.updateReportFile.mockResolvedValue({ id: 4 });
		const service = new ReportFileService({ reportFileRepository: mockRepo });

		const result = service.updateReportFile({ id: 4, data: { name: "new" } });

		expect(mockRepo.updateReportFile).toHaveBeenCalledWith({ id: 4, data: { name: "new" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteReportFile should delegate to repository", async () => {
		mockRepo.deleteReportFile.mockResolvedValue(true);
		const service = new ReportFileService({ reportFileRepository: mockRepo });

		const result = service.deleteReportFile(5);

		expect(mockRepo.deleteReportFile).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
