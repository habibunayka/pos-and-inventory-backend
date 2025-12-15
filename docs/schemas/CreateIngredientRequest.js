const CreateIngredientRequest = {
	"type": "object",
	"required": [
		"name",
		"unitId"
	],
	"properties": {
		"name": {
			"type": "string",
			"example": "Gula"
		},
		"sku": {
			"type": "string",
			"nullable": true,
			"example": "ING-001"
		},
		"unitId": {
			"type": "integer",
			"example": 1
		}
	}
};

export default CreateIngredientRequest;
