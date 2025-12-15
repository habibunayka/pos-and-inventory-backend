const CreateReportFileRequest = {
	"type": "object",
	"required": [
		"reportType",
		"reportScope",
		"fileName",
		"filePath"
	],
	"properties": {
		"reportType": {
			"type": "string"
		},
		"reportScope": {
			"type": "string"
		},
		"reportDate": {
			"type": "string",
			"format": "date-time",
			"nullable": true
		},
		"placeId": {
			"type": "integer",
			"nullable": true
		},
		"fileName": {
			"type": "string"
		},
		"filePath": {
			"type": "string"
		}
	}
};

export default CreateReportFileRequest;
