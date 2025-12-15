const UpdateTransactionRequest = {
	"type": "object",
	"minProperties": 1,
	"properties": {
		"cashierId": {
			"type": "integer",
			"example": 2
		},
		"placeId": {
			"type": "integer",
			"nullable": true,
			"example": 1
		},
		"tableId": {
			"type": "integer",
			"nullable": true,
			"example": 4
		},
		"orderType": {
			"type": "string",
			"nullable": true,
			"example": "takeaway"
		},
		"total": {
			"type": "number",
			"example": 75000
		},
		"tax": {
			"type": "number",
			"nullable": true,
			"example": 7500
		},
		"discount": {
			"type": "number",
			"nullable": true,
			"example": 5000
		},
		"paymentMethodId": {
			"type": "integer",
			"nullable": true,
			"example": 2
		}
	}
};

export default UpdateTransactionRequest;
