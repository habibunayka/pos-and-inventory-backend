const UpdatePermissionRequest = {
  "type": "object",
  "minProperties": 1,
  "properties": {
    "name": {
      "type": "string",
      "example": "user.manage"
    },
    "description": {
      "type": "string",
      "nullable": true,
      "example": "Full akses user"
    }
  }
};

export default UpdatePermissionRequest;
