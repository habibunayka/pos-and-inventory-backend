const CreatePlaceStockRequest = {
  "type": "object",
  "required": [
    "placeId",
    "ingredientId",
    "qty",
    "unitId"
  ],
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
      "example": 100
    },
    "unitId": {
      "type": "integer",
      "example": 1
    }
  }
};

export default CreatePlaceStockRequest;
