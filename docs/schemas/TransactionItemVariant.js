const TransactionItemVariant = {
  "type": "object",
  "required": [
    "id",
    "transactionItemId",
    "menuVariantId"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "example": 100
    },
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

export default TransactionItemVariant;
