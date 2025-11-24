const CreateCashierShiftRequest = {
  "type": "object",
  "required": [
    "placeId",
    "cashierId",
    "ipAddress"
  ],
  "properties": {
    "placeId": {
      "type": "integer",
      "example": 1
    },
    "cashierId": {
      "type": "integer",
      "example": 2
    },
    "ipAddress": {
      "type": "string",
      "example": "127.0.0.1"
    },
    "openingBalance": {
      "type": "number",
      "example": 0
    },
    "status": {
      "type": "string",
      "example": "open"
    }
  }
};

export default CreateCashierShiftRequest;
