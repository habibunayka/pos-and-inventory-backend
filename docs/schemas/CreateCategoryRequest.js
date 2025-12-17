const CreateCategoryRequest = {
	type: "object",
	required: ["name"],
	properties: {
		name: {
			type: "string",
			example: "beverages"
		}
	}
};

export default CreateCategoryRequest;
