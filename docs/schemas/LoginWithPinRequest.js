import { envOrDefault } from "../../prisma/utils/index.js";

const LoginWithPinRequest = {
  "type": "object",
  "required": [
    "username",
    "pin"
  ],
  "properties": {
    "username": {
      "type": "string",
      "example": envOrDefault("SEED_CASHIER_NAME", "Cashier A"),
      "description": "Nama atau username kasir yang digunakan untuk login"
    },
    "pin": {
      "type": "string",
      "example": envOrDefault("SEED_CASHIER_PIN", "123456"),
      "description": "PIN kasir yang sudah diatur di sistem"
    }
  }
};

export default LoginWithPinRequest;
