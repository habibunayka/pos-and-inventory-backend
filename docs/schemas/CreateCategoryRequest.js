const CreateCategoryRequest = {
	type: "object",
	required: ["name"],
	properties: {
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

export default CreateCategoryRequest;
