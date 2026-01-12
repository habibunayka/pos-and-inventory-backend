const UpdateKitchenOrderRequest = {
	type: "object",
	minProperties: 1,
	properties: {
		transactionItemId: {
			type: "integer",
			example: 10
		},
		status: {
			type: "string",
			enum: ["queued", "proses", "done"],
			example: "done"
		},
		startedAt: {
			type: "string",
			format: "date-time",
			nullable: true
		},
		finishedAt: {
			type: "string",
			format: "date-time",
			nullable: true
		},
		note: {
			type: "string",
			nullable: true
		}
	}
};

export default UpdateKitchenOrderRequest;
