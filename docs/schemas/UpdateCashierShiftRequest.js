const UpdateCashierShiftRequest = {
  "type": "object",
  "minProperties": 1,
  "properties": {
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
