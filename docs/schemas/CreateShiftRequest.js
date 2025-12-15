const CreateShiftRequest = {
	"type": "object",
	"required": [
		"placeId",
		"name",
		"startTime",
		"endTime"
	],
	"properties": {
		"placeId": {
			"type": "integer",
			"example": 1
		},
		"name": {
			"type": "string",
			"example": "Evening Shift"
		},
		"startTime": {
			"type": "string",
			"example": "16:00",
			"description": "Format HH:mm atau HH:mm:ss"
		},
		"endTime": {
			"type": "string",
			"example": "23:00",
			"description": "Format HH:mm atau HH:mm:ss"
		},
		"description": {
			"type": "string",
			"nullable": true,
			"example": "Shift reguler akhir pekan"
		},
		"isActive": {
			"type": "boolean",
			"example": true
		}
	}
};

export default CreateShiftRequest;
