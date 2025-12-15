const UpdateTransactionItemRequest = {
	"type": "object",
	"minProperties": 1,
	"properties": {
		"transactionId": {
			"type": "integer",
			"example": 1
		},
		"menuId": {
			"type": "integer",
			"example": 5
		},
		"qty": {
			"type": "integer",
			"example": 3
		},
		"price": {
			"type": "number",
			"example": 30000
		},
		"discount": {
			"type": "number",
			"nullable": true,
			"example": 1000
		}
	}
};

export default UpdateTransactionItemRequest;
