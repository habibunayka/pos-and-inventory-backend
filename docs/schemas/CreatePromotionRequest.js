const CreatePromotionRequest = {
	"type": "object",
	"required": [
		"name"
	],
	"properties": {
		"placeId": {
			"type": "integer",
			"nullable": true,
			"example": 1
		},
		"name": {
			"type": "string",
			"example": "Happy Hour"
		},
		"startAt": {
			"type": "string",
			"format": "date-time",
			"nullable": true
		},
		"endAt": {
			"type": "string",
			"format": "date-time",
			"nullable": true
		}
	}
};

export default CreatePromotionRequest;
