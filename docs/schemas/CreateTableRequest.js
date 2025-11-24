const CreateTableRequest = {
  "type": "object",
  "required": [
    "placeId",
    "name"
  ],
  "properties": {
    "placeId": {
      "type": "integer",
      "example": 1
    },
    "name": {
      "type": "string",
      "example": "T-01"
    },
    "status": {
      "type": "string",
      "nullable": true,
      "example": "available"
    }
  }
};

export default CreateTableRequest;
