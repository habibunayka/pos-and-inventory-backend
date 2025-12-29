const CreateTransactionRequest = {
	type: "object",
	required: ["cashierId", "total"],
	properties: {
		cashierId: {
			type: "integer",
			example: 2
		},
		placeId: {
			type: "integer",
			nullable: true,
			example: 1
		},
		tableId: {
			type: "integer",
			nullable: true,
			example: 3
		},
		orderType: {
			type: "string",
			nullable: true,
			example: "dine_in"
		},
		customerName: {
			type: "string",
			nullable: true,
			example: "Budi"
		},
		status: {
			type: "string",
			nullable: true,
			example: "paid"
		},
		items: {
			type: "array",
			nullable: true,
			items: {
				type: "object"
			}
		},
		total: {
			type: "number",
			example: 50000
		},
		tax: {
			type: "number",
			nullable: true,
			example: 5000
		},
		discount: {
			type: "number",
			nullable: true,
			example: 0
		},
		paymentMethodId: {
			type: "integer",
			nullable: true,
			example: 1
		}
	}
};

export default CreateTransactionRequest;
