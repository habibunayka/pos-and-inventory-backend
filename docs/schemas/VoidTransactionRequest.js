const VoidTransactionRequest = {
	type: "object",
	required: ["password"],
	properties: {
		password: {
			type: "string",
			example: "1234",
			description: "Password atau PIN pengguna yang sedang login"
		}
	}
};

export default VoidTransactionRequest;
