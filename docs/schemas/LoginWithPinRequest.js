import { envOrDefault } from "../../prisma/utils/index.js";

const LoginWithPinRequest = {
	"type": "object",
	"description": "Payload login khusus kasir yang memakai PIN pada field password",
	"required": [
		"username",
		"password"
	],
	"properties": {
		"username": {
			"type": "string",
			"example": envOrDefault("SEED_CASHIER_NAME", "Cashier A"),
			"description": "Nama atau username kasir sesuai data akun"
		},
		"password": {
			"type": "string",
			"example": envOrDefault("SEED_CASHIER_PIN", "123456"),
			"description": "PIN kasir 4-6 digit (dikirim melalui properti password)"
		}
	}
};

export default LoginWithPinRequest;
