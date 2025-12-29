const UpdateMenuVariantRequest = {
	type: "object",
	minProperties: 1,
	properties: {
		menuId: {
			type: "integer",
			example: 1
		},
		name: {
			type: "string",
			example: "Tingkat Pedas"
		}
	}
};

export default UpdateMenuVariantRequest;
