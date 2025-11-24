const Package = {
  "type": "object",
  "required": [
    "id",
    "name"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "example": 3
    },
    "name": {
      "type": "string",
      "example": "Sachet"
    },
    "description": {
      "type": "string",
      "nullable": true,
      "example": "Kemasan kecil 10g"
    }
  }
};

export default Package;
