import { envOrDefault } from "../../prisma/utils/index.js";

const LoginRequest = {
	type: "object",
	required: ["username", "password"],
	properties: {
		username: {
			type: "string",
			example: envOrDefault("SEED_OWNER_EMAIL", "brand.owner@example.com"),
			description: "Email akun yang digunakan untuk login"
		},
		password: {
			type: "string",
			example: envOrDefault("SEED_OWNER_PASSWORD", "BrandOwnerPass123!"),
			description: "Password atau PIN tergantung role pengguna"
		}
	}
};

export default LoginRequest;
