const Permission = {
	type: "object",
	required: ["id", "name"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
		name: {
			type: "string",
			example: "user.read"
		},
		description: {
			type: "string",
			nullable: true,
			example: "Boleh melihat daftar user"
		}
	}
};

export default Permission;
