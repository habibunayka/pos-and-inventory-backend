const Waste = {
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
      "example": 3
    },
    "placeId": {
      "type": "integer",
      "nullable": true,
      "example": 1
    },
    "qty": {
      "type": "number",
      "example": 2
    },
    "reason": {
      "type": "string",
      "nullable": true,
      "example": "Expired"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    }
  }
};

export default Waste;
