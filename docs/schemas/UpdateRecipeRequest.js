const UpdateRecipeRequest = {
	type: "object",
	minProperties: 1,
	properties: {
		menuId: {
			type: "integer",
			example: 1
		},
		ingredientId: {
			type: "integer",
			example: 10
		},
		qty: {
			type: "number",
			example: 3
		}
	}
};

export default UpdateRecipeRequest;
