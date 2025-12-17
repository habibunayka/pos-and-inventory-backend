const Station = {
	type: "object",
	required: ["id", "placeId", "name", "isActive"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
		placeId: {
			type: "integer",
			example: 1
		},
		name: {
			type: "string",
			example: "Front Counter"
		},
		description: {
			type: "string",
			nullable: true,
			example: "Cashier near the entrance"
		},
		isActive: {
			type: "boolean",
			example: true
		}
	}
};

export default Station;
