const UpdateSupplierProductRequest = {
  "type": "object",
  "minProperties": 1,
  "properties": {
    "supplierId": {
      "type": "integer",
      "example": 4
    },
    "ingredientId": {
      "type": "integer",
      "example": 10
    },
    "packageId": {
      "type": "integer",
      "example": 3
    },
    "qty": {
      "type": "number",
      "example": 10
    },
    "price": {
      "type": "number",
      "example": 20000
    },
    "leadTime": {
      "type": "integer",
      "nullable": true,
      "example": 5
    },
    "isActive": {
      "type": "boolean",
      "example": false
    }
  }
};

export default UpdateSupplierProductRequest;
