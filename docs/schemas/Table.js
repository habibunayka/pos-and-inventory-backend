const Table = {
	type: "object",
	required: ["id", "placeId", "name", "status"],
	properties: {
		id: {
			type: "integer",
			example: 5
		},
		placeId: {
			type: "integer",
			example: 1
		},
		name: {
			type: "string",
			example: "T-01"
		},
		status: {
			type: "string",
			example: "available"
		}
	}
};

export default Table;
