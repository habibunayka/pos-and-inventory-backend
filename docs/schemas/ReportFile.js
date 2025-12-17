const ReportFile = {
	type: "object",
	required: ["id", "reportType", "reportScope", "fileName", "filePath", "createdAt"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
		reportType: {
			type: "string",
			example: "sales"
		},
		reportScope: {
			type: "string",
			example: "daily"
		},
		reportDate: {
			type: "string",
			format: "date-time",
			nullable: true
		},
		placeId: {
			type: "integer",
			nullable: true
		},
		fileName: {
			type: "string",
			example: "sales-2025-01-01.csv"
		},
		filePath: {
			type: "string",
			example: "/reports/sales-2025-01-01.csv"
		},
		createdAt: {
			type: "string",
			format: "date-time"
		}
	}
};

export default ReportFile;
