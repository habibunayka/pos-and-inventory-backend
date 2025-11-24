const CreateTransactionItemVariantRequest = {
  "type": "object",
  "required": [
    "transactionItemId",
    "menuVariantId"
  ],
  "properties": {
    "transactionItemId": {
      "type": "integer",
      "example": 10
    },
    "menuVariantId": {
      "type": "integer",
      "example": 7
    },
    "extraPrice": {
      "type": "number",
      "example": 3000
    }
  }
};

export default CreateTransactionItemVariantRequest;
