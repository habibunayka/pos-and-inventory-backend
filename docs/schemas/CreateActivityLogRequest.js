const CreateActivityLogRequest = {
  "type": "object",
  "required": [
    "action"
  ],
  "properties": {
    "userId": {
      "type": "integer",
      "nullable": true
    },
    "action": {
      "type": "string"
    },
    "entityType": {
      "type": "string",
      "nullable": true
    },
    "entityId": {
      "type": "integer",
      "nullable": true
    },
    "contextJson": {
      "type": "object",
      "nullable": true
    }
  }
};

export default CreateActivityLogRequest;
