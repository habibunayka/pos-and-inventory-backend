const Category = {
	type: "object",
	required: ["id", "name"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
		name: {
			type: "string",
			example: "beverages"
		},
		type: {
			type: "string",
			enum: ["menu", "ingredient"],
			example: "menu"
		}
	}
};

export default Category;
