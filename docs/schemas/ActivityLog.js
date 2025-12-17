const ActivityLog = {
	type: "object",
	required: ["id", "action", "createdAt"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
		userId: {
			type: "integer",
			nullable: true
		},
		action: {
			type: "string",
			example: "create_order"
		},
		entityType: {
			type: "string",
			nullable: true,
			example: "order"
		},
		entityId: {
			type: "integer",
			nullable: true,
			example: 101
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

export default ActivityLog;
