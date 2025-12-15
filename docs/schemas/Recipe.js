const Recipe = {
	"type": "object",
	"required": [
		"id",
		"menuId",
		"ingredientId",
		"qty"
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
		"ingredientId": {
			"type": "integer",
			"example": 10
		},
		"qty": {
			"type": "number",
			"example": 2
		}
	}
};

export default Recipe;
