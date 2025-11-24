const CreateSupplierRequest = {
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "example": "PT Sumber Rejeki"
    },
    "contactName": {
      "type": "string",
      "nullable": true,
      "example": "Budi"
    },
    "phone": {
      "type": "string",
      "nullable": true,
      "example": "+62-812-1111-2222"
    },
    "email": {
      "type": "string",
      "nullable": true,
      "example": "sales@supplier.co.id"
    },
    "address": {
      "type": "string",
      "nullable": true,
      "example": "Jl. Sudirman No. 10"
    }
  }
};

export default CreateSupplierRequest;
