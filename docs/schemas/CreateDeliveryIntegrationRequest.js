const CreateDeliveryIntegrationRequest = {
  "type": "object",
  "required": [
    "placeId",
    "platformName"
  ],
  "properties": {
    "placeId": {
      "type": "integer",
      "example": 1
    },
    "platformName": {
      "type": "string",
      "example": "GrabFood"
    },
    "apiKey": {
      "type": "string",
      "nullable": true
    },
    "settingsJson": {
      "type": "object",
      "nullable": true
    }
  }
};

export default CreateDeliveryIntegrationRequest;
