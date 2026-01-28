const UpdateCategoryRequest = {
	type: "object",
	minProperties: 1,
	properties: {
		name: {
			type: "string",
			example: "food"
		},
		type: {
			type: "string",
			enum: ["menu", "ingredient"],
			example: "ingredient"
		}
	}
};

export default UpdateCategoryRequest;
