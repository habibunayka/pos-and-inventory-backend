const CreatePlaceRequest = {
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "example": "Outlet Baru"
    },
    "address": {
      "type": "string",
      "nullable": true,
      "example": "Jl. Soekarno No. 12, Bandung"
    },
    "phone": {
      "type": "string",
      "nullable": true,
      "example": "+62-811-0000-1111"
    },
    "logoPath": {
      "type": "string",
      "nullable": true,
      "example": "/uploads/logos/outlet.png"
    },
    "type": {
      "type": "string",
      "nullable": true,
      "example": "warehouse"
    },
    "isActive": {
      "type": "boolean",
      "default": true,
      "description": "Status aktif tempat"
    }
  }
};

export default CreatePlaceRequest;
