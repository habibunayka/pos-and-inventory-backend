const Menu = {
	type: "object",
	required: ["id", "name", "isActive"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
		placeId: {
			type: "integer",
			nullable: true,
			example: 1
		},
		name: {
			type: "string",
			example: "Nasi Goreng"
		},
		categoryId: {
			type: "integer",
			nullable: true,
			example: 2
		},
		description: {
			type: "string",
			nullable: true,
			example: "Menu favorit"
		},
		sku: {
			type: "string",
			nullable: true,
			example: "MN-001"
		},
		isActive: {
			type: "boolean",
			example: true
		},
		createdAt: {
			type: "string",
			format: "date-time"
		}
	}
};

export default Menu;
