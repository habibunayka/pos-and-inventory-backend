const UpdateIngredientPackageRequest = {
	"type": "object",
	"minProperties": 1,
	"properties": {
		"ingredientId": {
			"type": "integer",
			"example": 10
		},
		"packageId": {
			"type": "integer",
			"example": 3
		},
		"qty": {
			"type": "number",
			"example": 12
		}
	}
};

export default UpdateIngredientPackageRequest;
