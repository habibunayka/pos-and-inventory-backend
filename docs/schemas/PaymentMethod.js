const PaymentMethod = {
  "type": "object",
  "required": [
    "id",
    "name",
    "isActive"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "example": 1
    },
    "name": {
      "type": "string",
      "example": "cash"
    },
    "description": {
      "type": "string",
      "nullable": true,
      "example": "Tunai"
    },
    "isActive": {
      "type": "boolean",
      "example": true
    }
  }
};

export default PaymentMethod;
