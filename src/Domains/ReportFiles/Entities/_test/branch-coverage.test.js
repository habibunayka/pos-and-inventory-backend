import { describe, expect, it } from "@jest/globals";
import ReportFile from "../ReportFile.js";

describe("ReportFile entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(ReportFile.fromPersistence(null)).toBeNull();
	});

	it("ReportFile maps snake_case properties", () => {
		const entity = ReportFile.fromPersistence({
			reportType: "daily",
			reportScope: "all",
			fileName: "file",
			filePath: "/tmp/file",
			createdAt: "now"
		});
		expect(entity).toMatchObject({
			id: null,
			reportDate: null,
			placeId: null,
			filePath: "/tmp/file",
			createdAt: "now"
		});
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new ReportFile({
				reportType: "daily",
				reportScope: "all",
				fileName: "f",
				filePath: "/f",
				createdAt: "now"
			});
			expect(entity).toBeInstanceOf(ReportFile);
			expect(entity).toMatchObject({ reportDate: null, placeId: null });
		});
	});
});
