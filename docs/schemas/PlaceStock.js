const PlaceStock = {
	"type": "object",
	"required": [
		"id",
		"placeId",
		"ingredientId",
		"qty",
		"unitId"
	],
	"properties": {
		"id": {
			"type": "integer",
			"example": 1
		},
		"placeId": {
			"type": "integer",
			"example": 1
		},
		"ingredientId": {
			"type": "integer",
			"example": 2
		},
		"qty": {
			"type": "number",
			"example": 100
		},
		"unitId": {
			"type": "integer",
			"example": 1
		}
	}
};

export default PlaceStock;
