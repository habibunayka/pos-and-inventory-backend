const CreateUserRequest = {
  "type": "object",
  "required": [
    "name",
    "roleName"
  ],
  "properties": {
    "name": {
      "type": "string",
      "example": "Jane Doe"
    },
    "roleName": {
      "type": "string",
      "example": "cashier",
      "description": "Nama role yang terdaftar (brand_owner, location_owner, admin, store_manager, cashier, chef, purchaising, waiters)"
    },
    "email": {
      "type": "string",
      "nullable": true,
      "example": "jane.doe@example.com",
      "description": "Wajib untuk role non-cashier"
    },
    "password": {
      "type": "string",
      "nullable": true,
      "example": "SuperSecret123",
      "description": "Minimal 8 karakter, hanya untuk role non-cashier"
    },
    "pin": {
      "type": "string",
      "nullable": true,
      "example": "1234",
      "description": "4-6 digit numerik, hanya untuk role cashier"
    },
    "status": {
      "type": "string",
      "nullable": true,
      "example": "active"
    },
    "placeId": {
      "type": "integer",
      "nullable": true,
      "example": 5
    }
  }
};

export default CreateUserRequest;
