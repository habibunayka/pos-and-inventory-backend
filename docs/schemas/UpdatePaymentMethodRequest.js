const UpdatePaymentMethodRequest = {
  "type": "object",
  "minProperties": 1,
  "properties": {
    "name": {
      "type": "string",
      "example": "qris"
    },
    "description": {
      "type": "string",
      "nullable": true,
      "example": "QRIS"
    },
    "isActive": {
      "type": "boolean",
      "example": true
    }
  }
};

export default UpdatePaymentMethodRequest;
