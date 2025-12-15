const Shift = {
	"type": "object",
	"required": [
		"id",
		"placeId",
		"name",
		"startTime",
		"endTime",
		"isActive"
	],
	"properties": {
		"id": {
			"type": "integer",
			"example": 1
		},
		"placeId": {
			"type": "integer",
			"example": 1
		},
		"name": {
			"type": "string",
			"example": "Morning Shift"
		},
		"startTime": {
			"type": "string",
			"example": "08:00"
		},
		"endTime": {
			"type": "string",
			"example": "16:00"
		},
		"description": {
			"type": "string",
			"nullable": true,
			"example": "Default weekday opening shift"
		},
		"isActive": {
			"type": "boolean",
			"example": true
		}
	}
};

export default Shift;
