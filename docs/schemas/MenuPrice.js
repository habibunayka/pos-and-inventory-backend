const MenuPrice = {
	"type": "object",
	"required": [
		"id",
		"menuId",
		"price",
		"effectiveDate"
	],
	"properties": {
		"id": {
			"type": "integer",
			"example": 1
		},
		"menuId": {
			"type": "integer",
			"example": 1
		},
		"price": {
			"type": "number",
			"example": 25000
		},
		"effectiveDate": {
			"type": "string",
			"format": "date",
			"example": "2025-01-01"
		}
	}
};

export default MenuPrice;
