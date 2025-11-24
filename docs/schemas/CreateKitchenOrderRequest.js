const CreateKitchenOrderRequest = {
  "type": "object",
  "required": [
    "transactionItemId"
  ],
  "properties": {
    "transactionItemId": {
      "type": "integer",
      "example": 10
    },
    "status": {
      "type": "string",
      "nullable": true,
      "example": "waiting"
    },
    "startedAt": {
      "type": "string",
      "format": "date-time",
      "nullable": true
    },
    "finishedAt": {
      "type": "string",
      "format": "date-time",
      "nullable": true
    },
    "note": {
      "type": "string",
      "nullable": true
    }
  }
};

export default CreateKitchenOrderRequest;
