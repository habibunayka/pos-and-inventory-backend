const CloseCashierShiftRequest = {
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
    }
  }
};

export default CloseCashierShiftRequest;
