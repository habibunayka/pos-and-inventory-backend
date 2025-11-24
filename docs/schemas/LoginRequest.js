const LoginRequest = {
  "type": "object",
  "required": [
    "username",
    "password"
  ],
  "properties": {
    "username": {
      "type": "string",
      "example": "alice@example.com",
      "description": "Email akun yang digunakan untuk login"
    },
    "password": {
      "type": "string",
      "example": "SuperSecret123",
      "description": "Password atau PIN tergantung role pengguna"
    }
  }
};

export default LoginRequest;
