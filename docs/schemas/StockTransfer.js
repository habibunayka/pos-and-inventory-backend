const StockTransfer = {
  "type": "object",
  "required": [
    "id",
    "ingredientId",
    "qty"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "example": 1
    },
    "ingredientId": {
      "type": "integer",
      "example": 2
    },
    "fromPlaceId": {
      "type": "integer",
      "nullable": true,
      "example": 1
    },
    "toPlaceId": {
      "type": "integer",
      "nullable": true,
      "example": 2
    },
    "qty": {
      "type": "number",
      "example": 5
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    }
  }
};

export default StockTransfer;
