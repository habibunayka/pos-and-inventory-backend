const CreateRecipeRequest = {
	type: "object",
	required: ["menuId", "ingredientId", "qty"],
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
			example: 2
		}
	}
};

export default CreateRecipeRequest;
