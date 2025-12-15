const MenuVariant = {
	"type": "object",
	"required": [
		"id",
		"menuId",
		"name"
	],
	"properties": {
		"id": {
			"type": "integer",
			"example": 1
		},
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

export default MenuVariant;
