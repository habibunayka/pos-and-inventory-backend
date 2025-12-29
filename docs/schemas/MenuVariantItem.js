const MenuVariantItem = {
	type: "object",
	required: ["id", "menuVariantId", "name", "additionalPrice"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
		menuVariantId: {
			type: "integer",
			example: 1
		},
		name: {
			type: "string",
			example: "Large"
		},
		additionalPrice: {
			type: "number",
			example: 5000
		}
	}
};

export default MenuVariantItem;
