const CashierShift = {
  "type": "object",
  "required": [
    "id",
    "placeId",
    "stationId",
    "shiftId",
    "cashierId",
    "openedAt",
    "status"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "example": 1
    },
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
    "cashierId": {
      "type": "integer",
      "example": 2
    },
    "openedAt": {
      "type": "string",
      "format": "date-time"
    },
    "closedAt": {
      "type": "string",
      "format": "date-time",
      "nullable": true
    },
    "openingBalance": {
      "type": "number",
      "example": 0
    },
    "closingBalance": {
      "type": "number",
      "nullable": true
    },
    "systemBalance": {
      "type": "number",
      "nullable": true
    },
    "ipAddress": {
      "type": "string",
      "example": "127.0.0.1"
    },
    "status": {
      "type": "string",
      "example": "open"
    }
  }
};

export default CashierShift;
