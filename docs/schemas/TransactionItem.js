const TransactionItem = {
  "type": "object",
  "required": [
    "id",
    "transactionId",
    "menuId",
    "qty",
    "price"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "example": 10
    },
    "transactionId": {
      "type": "integer",
      "example": 1
    },
    "menuId": {
      "type": "integer",
      "example": 5
    },
    "qty": {
      "type": "integer",
      "example": 2
    },
    "price": {
      "type": "number",
      "example": 25000
    },
    "discount": {
      "type": "number",
      "nullable": true,
      "example": 0
    }
  }
};

export default TransactionItem;
