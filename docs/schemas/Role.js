const Role = {
	"type": "object",
	"required": [
		"id",
		"name"
	],
	"properties": {
		"id": {
			"type": "integer",
			"example": 2
		},
		"name": {
			"type": "string",
			"example": "store_manager"
		},
		"description": {
			"type": "string",
			"nullable": true,
			"example": "Mengelola operasional harian outlet"
		},
		"permissions": {
			"type": "array",
			"items": {
				"type": "string"
			},
			"example": [
				"user.read",
				"user.write"
			]
		}
	}
};

export default Role;
