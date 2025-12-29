const CreateSupplierProductRequest = {
	type: "object",
	required: ["supplierId", "ingredientId", "packageId", "qty", "price"],
	properties: {
		supplierId: {
			type: "integer",
			example: 4
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
			example: 12
		},
		price: {
			type: "number",
			example: 25000
		},
		leadTime: {
			type: "integer",
			nullable: true,
			example: 3,
			description: "Hari"
		},
		isActive: {
			type: "boolean",
			example: true
		}
	}
};

export default CreateSupplierProductRequest;
