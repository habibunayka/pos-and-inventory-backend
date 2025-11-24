const UpdateReportFileRequest = {
  "type": "object",
  "minProperties": 1,
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

export default UpdateReportFileRequest;
