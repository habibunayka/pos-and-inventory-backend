const UpdateMenuRequest = {
	type: "object",
	minProperties: 1,
	properties: {
		placeId: {
			type: "integer",
			nullable: true,
			example: 1
		},
		name: {
			type: "string",
			example: "Nasi Goreng Spesial"
		},
		categoryId: {
			type: "integer",
			nullable: true,
			example: 2
		},
		description: {
			type: "string",
			nullable: true,
			example: "Pedas"
		},
		sku: {
			type: "string",
			nullable: true,
			example: "MN-001"
		},
		isActive: {
			type: "boolean",
			example: true
		}
	}
};

export default UpdateMenuRequest;
