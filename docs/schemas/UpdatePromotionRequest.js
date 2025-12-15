const UpdatePromotionRequest = {
	"type": "object",
	"minProperties": 1,
	"properties": {
		"placeId": {
			"type": "integer",
			"nullable": true,
			"example": 1
		},
		"name": {
			"type": "string",
			"example": "Weekend Deal"
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

export default UpdatePromotionRequest;
