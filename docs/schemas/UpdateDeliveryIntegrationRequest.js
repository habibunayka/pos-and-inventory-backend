const UpdateDeliveryIntegrationRequest = {
  "type": "object",
  "minProperties": 1,
  "properties": {
    "placeId": {
      "type": "integer",
      "example": 1
    },
    "platformName": {
      "type": "string",
      "example": "ShopeeFood"
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

export default UpdateDeliveryIntegrationRequest;
