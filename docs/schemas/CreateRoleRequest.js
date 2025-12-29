const CreateRoleRequest = {
	type: "object",
	required: ["name"],
	properties: {
		name: {
			type: "string",
			example: "admin",
			description: "Nama role unik dan akan disimpan dalam huruf kecil"
		},
		description: {
			type: "string",
			nullable: true,
			example: "Mengawasi operasional harian"
		},
		permissions: {
			type: "array",
			nullable: true,
			items: {
				type: "string"
			},
			example: ["manage_orders", "view_reports"],
			description: "Daftar nama permission yang sudah terdaftar"
		}
	}
};

export default CreateRoleRequest;
