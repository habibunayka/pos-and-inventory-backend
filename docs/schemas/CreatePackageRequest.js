const CreatePackageRequest = {
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "example": "sachet",
      "description": "Nama paket/kemasan dalam huruf kecil"
    },
    "description": {
      "type": "string",
      "nullable": true,
      "example": "Kemasan kecil 10g"
    }
  }
};

export default CreatePackageRequest;
