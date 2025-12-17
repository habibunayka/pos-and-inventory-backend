const UpdateRoleRequest = {
	type: "object",
	properties: {
		name: {
			type: "string",
			example: "store_manager"
		},
		description: {
			type: "string",
			nullable: true,
			example: "Mengelola outlet dan laporan"
		},
		permissions: {
			type: "array",
			nullable: true,
			items: {
				type: "string"
			},
			example: ["manage_orders", "view_reports"]
		}
	}
};

export default UpdateRoleRequest;
