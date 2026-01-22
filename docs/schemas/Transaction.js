const Transaction = {
	type: "object",
	required: ["id", "cashierId", "total"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
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
				note: {
						type: "string",
						nullable: true,
						example: "Customer requested split bills"
				},
				voidReason: {
						type: "string",
						nullable: true,
						example: "Customer meminta batal"
				},
				items: {
						type: "array",
						nullable: true,
						items: {
								$ref: "#/components/schemas/TransactionItem"
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
		},
		createdAt: {
			type: "string",
			format: "date-time"
		}
	}
};

export default Transaction;
