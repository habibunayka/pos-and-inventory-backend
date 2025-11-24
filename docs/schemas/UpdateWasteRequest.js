const UpdateWasteRequest = {
  "type": "object",
  "minProperties": 1,
  "properties": {
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
      "example": 1
    },
    "reason": {
      "type": "string",
      "nullable": true,
      "example": "Broken"
    }
  }
};

export default UpdateWasteRequest;
