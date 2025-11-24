const UpdateSupplierRequest = {
  "type": "object",
  "minProperties": 1,
  "properties": {
    "name": {
      "type": "string",
      "example": "PT Rejeki Abadi"
    },
    "contactName": {
      "type": "string",
      "nullable": true,
      "example": "Andi"
    },
    "phone": {
      "type": "string",
      "nullable": true,
      "example": "+62-811-0000-9999"
    },
    "email": {
      "type": "string",
      "nullable": true,
      "example": "contact@rejeki.co.id"
    },
    "address": {
      "type": "string",
      "nullable": true,
      "example": "Jl. Merdeka No. 1"
    }
  }
};

export default UpdateSupplierRequest;
