const SystemLog = {
	type: "object",
	required: ["id", "message", "createdAt"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
		level: {
			type: "string",
			nullable: true,
			example: "error"
		},
		message: {
			type: "string",
			example: "Unhandled exception"
		},
		contextJson: {
			type: "object",
			nullable: true
		},
		createdAt: {
			type: "string",
			format: "date-time"
		}
	}
};

export default SystemLog;
