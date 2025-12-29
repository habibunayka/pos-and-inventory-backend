const CreateTableRequest = {
  "type": "object",
  "required": [
    "placeId",
    "name",
    "capacity"
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
    "capacity": {
      "type": "integer",
      "example": 4
    },
    "status": {
      "type": "string",
      "nullable": true,
      "example": "available"
    }
  }
};

export default CreateTableRequest;
