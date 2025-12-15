const UpdateMenuPriceRequest = {
	"type": "object",
	"minProperties": 1,
	"properties": {
		"menuId": {
			"type": "integer",
			"example": 1
		},
		"price": {
			"type": "number",
			"example": 30000
		},
		"effectiveDate": {
			"type": "string",
			"format": "date",
			"example": "2025-06-01"
		}
	}
};

export default UpdateMenuPriceRequest;
