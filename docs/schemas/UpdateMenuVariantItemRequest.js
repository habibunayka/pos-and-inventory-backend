const UpdateMenuVariantItemRequest = {
	type: "object",
	minProperties: 1,
	properties: {
		menuVariantId: {
			type: "integer",
			example: 1
		},
		name: {
			type: "string",
			example: "Small"
		},
		additionalPrice: {
			type: "number",
			example: 0
		}
	}
};

export default UpdateMenuVariantItemRequest;
