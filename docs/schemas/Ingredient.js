const Ingredient = {
	type: "object",
	required: ["id", "name", "unitId"],
	properties: {
		id: {
			type: "integer",
			example: 10
		},
		name: {
			type: "string",
			example: "Gula"
		},
		sku: {
			type: "string",
			nullable: true,
			example: "ING-001"
		},
		unitId: {
			type: "integer",
			example: 1
		}
	}
};

export default Ingredient;
