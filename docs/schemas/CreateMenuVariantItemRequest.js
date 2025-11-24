const CreateMenuVariantItemRequest = {
  "type": "object",
  "required": [
    "menuVariantId",
    "name"
  ],
  "properties": {
    "menuVariantId": {
      "type": "integer",
      "example": 1
    },
    "name": {
      "type": "string",
      "example": "Large"
    },
    "additionalPrice": {
      "type": "number",
      "example": 5000
    }
  }
};

export default CreateMenuVariantItemRequest;
