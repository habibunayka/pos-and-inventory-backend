const CreateWasteRequest = {
  "type": "object",
  "required": [
    "ingredientId",
    "qty"
  ],
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
      "example": 2
    },
    "reason": {
      "type": "string",
      "nullable": true,
      "example": "Expired"
    }
  }
};

export default CreateWasteRequest;
