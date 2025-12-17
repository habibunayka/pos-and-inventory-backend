const UpdateUserRequest = {
	type: "object",
	properties: {
		name: {
			type: "string",
			example: "Jane Smith"
		},
		status: {
			type: "string",
			example: "inactive"
		},
		roleName: {
			type: "string",
			example: "store_manager"
		},
		email: {
			type: "string",
			nullable: true,
			example: "jane.smith@example.com"
		},
		password: {
			type: "string",
			nullable: true,
			example: "NewSecret123"
		},
		pin: {
			type: "string",
			nullable: true,
			example: "9876"
		},
		placeId: {
			type: "integer",
			nullable: true,
			example: 8
		}
	}
};

export default UpdateUserRequest;
