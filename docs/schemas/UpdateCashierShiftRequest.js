const UpdateCashierShiftRequest = {
  "type": "object",
  "minProperties": 1,
  "properties": {
    "placeId": {
      "type": "integer",
      "example": 1
    },
    "stationId": {
      "type": "integer",
      "example": 2
    },
    "shiftId": {
      "type": "integer",
      "example": 1
    },
    "closedAt": {
      "type": "string",
      "format": "date-time",
      "nullable": true
    },
    "closingBalance": {
      "type": "number",
      "nullable": true
    },
    "systemBalance": {
      "type": "number",
      "nullable": true
    },
    "status": {
      "type": "string",
      "example": "closed"
    }
  }
};

export default UpdateCashierShiftRequest;
