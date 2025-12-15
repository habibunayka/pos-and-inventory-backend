const CreateStockTransferRequest = {
	"type": "object",
	"required": [
		"ingredientId",
		"qty"
	],
	"properties": {
		"ingredientId": {
			"type": "integer",
			"example": 2
		},
		"fromPlaceId": {
			"type": "integer",
			"nullable": true,
			"example": 1
		},
		"toPlaceId": {
			"type": "integer",
			"nullable": true,
			"example": 2
		},
		"qty": {
			"type": "number",
			"example": 5
		}
	}
};

export default CreateStockTransferRequest;
