const InventoryStockDaily = {
	"type": "object",
	"required": [
		"id",
		"placeId",
		"ingredientId",
		"date",
		"openingQty",
		"closingQty"
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
		"ingredientId": {
			"type": "integer",
			"example": 2
		},
		"date": {
			"type": "string",
			"format": "date",
			"example": "2025-01-01"
		},
		"openingQty": {
			"type": "number",
			"example": 100
		},
		"closingQty": {
			"type": "number",
			"example": 90
		},
		"diffQty": {
			"type": "number",
			"nullable": true,
			"example": -10
		}
	}
};

export default InventoryStockDaily;
