const CreateIngredientPackageRequest = {
	"type": "object",
	"required": [
		"ingredientId",
		"packageId",
		"qty"
	],
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
			"example": 10
		}
	}
};

export default CreateIngredientPackageRequest;
