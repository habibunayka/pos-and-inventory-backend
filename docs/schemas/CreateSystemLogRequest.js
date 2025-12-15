const CreateSystemLogRequest = {
	"type": "object",
	"required": [
		"message"
	],
	"properties": {
		"level": {
			"type": "string",
			"nullable": true
		},
		"message": {
			"type": "string"
		},
		"contextJson": {
			"type": "object",
			"nullable": true
		}
	}
};

export default CreateSystemLogRequest;
