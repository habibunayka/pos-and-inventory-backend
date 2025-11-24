const CreatePaymentMethodRequest = {
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
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

export default CreatePaymentMethodRequest;
