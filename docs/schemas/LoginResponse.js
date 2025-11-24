const LoginResponse = {
  "type": "object",
  "required": [
    "token",
    "tokenType",
    "user"
  ],
  "properties": {
    "token": {
      "type": "string",
      "description": "JWT token yang harus digunakan pada Authorization header",
      "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "tokenType": {
      "type": "string",
      "example": "Bearer"
    },
    "user": {
      "$ref": "#/components/schemas/User"
    }
  }
};

export default LoginResponse;
