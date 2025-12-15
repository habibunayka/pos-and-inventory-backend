const UpdateShiftRequest = {
	"type": "object",
	"minProperties": 1,
	"properties": {
		"placeId": {
			"type": "integer",
			"example": 1
		},
		"name": {
			"type": "string",
			"example": "Split Shift"
		},
		"startTime": {
			"type": "string",
			"example": "10:00"
		},
		"endTime": {
			"type": "string",
			"example": "18:00"
		},
		"description": {
			"type": "string",
			"nullable": true,
			"example": "Shift khusus hari libur"
		},
		"isActive": {
			"type": "boolean",
			"example": false
		}
	}
};

export default UpdateShiftRequest;
