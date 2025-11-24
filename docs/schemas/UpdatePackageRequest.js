const UpdatePackageRequest = {
  "type": "object",
  "minProperties": 1,
  "properties": {
    "name": {
      "type": "string",
      "example": "pack"
    },
    "description": {
      "type": "string",
      "nullable": true,
      "example": "Isi 1kg"
    }
  }
};

export default UpdatePackageRequest;
