const CreateInventoryStockDailyRequest = {
  "type": "object",
  "required": [
    "placeId",
    "ingredientId",
    "date",
    "openingQty",
    "closingQty"
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
    "date": {
      "type": "string",
      "format": "date",
      "example": "2025-01-01"
    },
    "openingQty": {
      "type": "number",
      "example": 100
    },
    "closingQty": {
      "type": "number",
      "example": 90
    },
    "diffQty": {
      "type": "number",
      "nullable": true,
      "example": -10
    }
  }
};

export default CreateInventoryStockDailyRequest;
