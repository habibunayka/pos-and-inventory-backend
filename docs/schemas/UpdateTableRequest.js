const UpdateTableRequest = {
  "type": "object",
  "minProperties": 1,
  "properties": {
    "placeId": {
      "type": "integer",
      "example": 2
    },
    "name": {
      "type": "string",
      "example": "T-02"
    },
    "status": {
      "type": "string",
      "nullable": true,
      "example": "occupied"
    }
  }
};

export default UpdateTableRequest;
