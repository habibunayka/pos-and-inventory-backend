const Place = {
	"type": "object",
	"required": [
		"id",
		"name",
		"isActive"
	],
	"properties": {
		"id": {
			"type": "integer",
			"example": 1
		},
		"name": {
			"type": "string",
			"example": "Outlet Utama"
		},
		"address": {
			"type": "string",
			"nullable": true,
			"example": "Jl. Merdeka No. 1, Jakarta"
		},
		"phone": {
			"type": "string",
			"nullable": true,
			"example": "+62-812-3456-7890"
		},
		"logoPath": {
			"type": "string",
			"nullable": true,
			"example": "/uploads/logos/main.png"
		},
		"type": {
			"type": "string",
			"nullable": true,
			"example": "outlet",
			"description": "Jenis tempat (outlet, warehouse, dsb)"
		},
		"isActive": {
			"type": "boolean",
			"example": true
		}
	}
};

export default Place;
