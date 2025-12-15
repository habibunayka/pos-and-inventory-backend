const ErrorResponse = {
	"type": "object",
	"required": [
		"message"
	],
	"properties": {
		"message": {
			"type": "string",
			"example": "Validation error"
		},
		"details": {
			"nullable": true,
			"description": "Detail tambahan terkait kesalahan (jika ada)"
		}
	}
};

export default ErrorResponse;
