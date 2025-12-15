const UpdateInventoryStockDailyRequest = {
	"type": "object",
	"minProperties": 1,
	"properties": {
		"placeId": {
			"type": "integer",
			"example": 1
		},
		"ingredientId": {
			"type": "integer",
			"example": 2
		},
		"date": {
			"type": "string",
			"format": "date",
			"example": "2025-01-02"
		},
		"openingQty": {
			"type": "number",
			"example": 110
		},
		"closingQty": {
			"type": "number",
			"example": 95
		},
		"diffQty": {
			"type": "number",
			"nullable": true,
			"example": -15
		}
	}
};

export default UpdateInventoryStockDailyRequest;
