const UpdateIngredientRequest = {
	"type": "object",
	"minProperties": 1,
	"properties": {
		"name": {
			"type": "string",
			"example": "Gula Pasir"
		},
		"sku": {
			"type": "string",
			"nullable": true,
			"example": "ING-001"
		},
		"unitId": {
			"type": "integer",
			"example": 2
		}
	}
};

export default UpdateIngredientRequest;
