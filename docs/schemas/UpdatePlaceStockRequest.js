const UpdatePlaceStockRequest = {
	"type": "object",
	"minProperties": 1,
	"properties": {
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
			"example": 120
		},
		"unitId": {
			"type": "integer",
			"example": 1
		}
	}
};

export default UpdatePlaceStockRequest;
