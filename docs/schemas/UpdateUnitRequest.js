const UpdateUnitRequest = {
  "type": "object",
  "minProperties": 1,
  "properties": {
    "name": {
      "type": "string",
      "example": "kilogram"
    },
    "abbreviation": {
      "type": "string",
      "example": "kg"
    }
  }
};

export default UpdateUnitRequest;
