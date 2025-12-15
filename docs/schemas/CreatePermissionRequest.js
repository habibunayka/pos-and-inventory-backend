const CreatePermissionRequest = {
	"type": "object",
	"required": [
		"name"
	],
	"properties": {
		"name": {
			"type": "string",
			"example": "user.write",
			"description": "Nama permission huruf kecil"
		},
		"description": {
			"type": "string",
			"nullable": true,
			"example": "Boleh membuat atau mengubah user"
		}
	}
};

export default CreatePermissionRequest;
