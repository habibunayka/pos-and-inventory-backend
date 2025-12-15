const KitchenOrder = {
	"type": "object",
	"required": [
		"id",
		"transactionItemId",
		"status"
	],
	"properties": {
		"id": {
			"type": "integer",
			"example": 1
		},
		"transactionItemId": {
			"type": "integer",
			"example": 10
		},
		"status": {
			"type": "string",
			"example": "waiting"
		},
		"startedAt": {
			"type": "string",
			"format": "date-time",
			"nullable": true
		},
		"finishedAt": {
			"type": "string",
			"format": "date-time",
			"nullable": true
		},
		"note": {
			"type": "string",
			"nullable": true
		}
	}
};

export default KitchenOrder;
