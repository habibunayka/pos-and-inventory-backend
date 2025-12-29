const IngredientPackage = {
	type: "object",
	required: ["id", "ingredientId", "packageId", "qty"],
	properties: {
		id: {
			type: "integer",
			example: 7
		},
		ingredientId: {
			type: "integer",
			example: 10
		},
		packageId: {
			type: "integer",
			example: 3
		},
		qty: {
			type: "number",
			example: 10
		}
	}
};

export default IngredientPackage;
