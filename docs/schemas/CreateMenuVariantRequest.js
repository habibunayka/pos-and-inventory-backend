const CreateMenuVariantRequest = {
	"type": "object",
	"required": [
		"menuId",
		"name"
	],
	"properties": {
		"menuId": {
			"type": "integer",
			"example": 1
		},
		"name": {
			"type": "string",
			"example": "Size"
		}
	}
};

export default CreateMenuVariantRequest;
