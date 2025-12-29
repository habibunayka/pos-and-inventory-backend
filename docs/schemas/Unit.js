const Unit = {
	type: "object",
	required: ["id", "name"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
		name: {
			type: "string",
			example: "Gram"
		},
		abbreviation: {
			type: "string",
			nullable: true,
			example: "g"
		}
	}
};

export default Unit;
