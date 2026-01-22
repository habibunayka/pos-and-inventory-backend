const VoidTransactionRequest = {
	type: "object",
	required: ["password", "reason"],
	properties: {
		password: {
			type: "string",
			example: "1234",
			description: "Password atau PIN pengguna yang sedang login"
		},
		reason: {
			type: "string",
			example: "Customer meminta batal",
			description: "Alasan pembatalan transaksi"
		}
	}
};

export default VoidTransactionRequest;
