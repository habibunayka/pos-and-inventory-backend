const CreateStationRequest = {
	"type": "object",
	"required": [
		"placeId",
		"name"
	],
	"properties": {
		"placeId": {
			"type": "integer",
			"example": 1
		},
		"name": {
			"type": "string",
			"example": "Front Counter"
		},
		"description": {
			"type": "string",
			"nullable": true,
			"example": "Cashier near the entrance"
		},
		"isActive": {
			"type": "boolean",
			"example": true
		}
	}
};

export default CreateStationRequest;
