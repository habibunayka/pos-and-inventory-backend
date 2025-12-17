const User = {
	type: "object",
	required: ["id", "name", "status", "authenticationMethod"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
		name: {
			type: "string",
			example: "John Doe"
		},
		email: {
			type: "string",
			nullable: true,
			example: "john.doe@example.com"
		},
		status: {
			type: "string",
			example: "active"
		},
		authenticationMethod: {
			type: "string",
			description: "Metode autentikasi yang digunakan pengguna",
			enum: ["password", "pin"]
		},
		placeId: {
			type: "integer",
			nullable: true,
			example: 10,
			description: "ID tempat tempat pengguna ditugaskan"
		},
		role: {
			nullable: true,
			$ref: "#/components/schemas/Role"
		}
	}
};

export default User;
