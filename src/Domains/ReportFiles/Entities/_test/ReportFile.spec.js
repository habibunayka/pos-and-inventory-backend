import { describe, expect, it } from "@jest/globals";
import ReportFile from "../ReportFile.js";

describe("ReportFile", () => {
	it("returns null when record is missing", () => {
		expect(ReportFile.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			reportType: "reportType-value-2",
			reportScope: "reportScope-value-3",
			reportDate: "reportDate-value-4",
			placeId: "placeId-value-5",
			fileName: "fileName-value-6",
			filePath: "filePath-value-7",
			createdAt: "createdAt-value-8"
		};

		const entity = ReportFile.fromPersistence(record);

		expect(entity).toBeInstanceOf(ReportFile);
		expect(entity).toMatchObject({
			id: "id-value-1",
			reportType: "reportType-value-2",
			reportScope: "reportScope-value-3",
			reportDate: "reportDate-value-4",
			placeId: "placeId-value-5",
			fileName: "fileName-value-6",
			filePath: "filePath-value-7",
			createdAt: "createdAt-value-8"
		});
	});
});
