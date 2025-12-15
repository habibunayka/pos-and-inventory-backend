const UpdatePlaceRequest = {
	"type": "object",
	"minProperties": 1,
	"properties": {
		"name": {
			"type": "string",
			"example": "Outlet Cabang Selatan"
		},
		"address": {
			"type": "string",
			"nullable": true,
			"example": "Jl. Pahlawan No. 8, Surabaya"
		},
		"phone": {
			"type": "string",
			"nullable": true,
			"example": "+62-813-2222-3333"
		},
		"logoPath": {
			"type": "string",
			"nullable": true,
			"example": "/uploads/logos/updated.png"
		},
		"type": {
			"type": "string",
			"nullable": true,
			"example": "cold_storage"
		},
		"isActive": {
			"type": "boolean",
			"description": "Ubah status aktif tempat"
		}
	}
};

export default UpdatePlaceRequest;
