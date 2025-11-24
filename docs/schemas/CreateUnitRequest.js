const CreateUnitRequest = {
  "type": "object",
  "required": [
    "name",
    "abbreviation"
  ],
  "properties": {
    "name": {
      "type": "string",
      "example": "gram",
      "description": "Nama unit dalam huruf kecil"
    },
    "abbreviation": {
      "type": "string",
      "example": "g"
    }
  }
};

export default CreateUnitRequest;
