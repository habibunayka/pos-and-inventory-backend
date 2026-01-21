import { describe, expect, it } from "@jest/globals";
import ReportFileService from "../ReportFileService.js";
import ReportFileRepository from "../../../../Domains/ReportFiles/Repositories/ReportFileRepository.js";

describe("ReportFileService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new ReportFileRepository();
		const service = new ReportFileService({ reportFileRepository: repo });
		expect(service).toBeInstanceOf(ReportFileService);
	});
});
