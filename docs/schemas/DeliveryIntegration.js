const DeliveryIntegration = {
	type: "object",
	required: ["id", "placeId", "platformName"],
	properties: {
		id: {
			type: "integer",
			example: 1
		},
		placeId: {
			type: "integer",
			example: 1
		},
		platformName: {
			type: "string",
			example: "GoFood"
		},
		apiKey: {
			type: "string",
			nullable: true,
			example: "secret"
		},
		settingsJson: {
			type: "object",
			nullable: true,
			example: {
				region: "ID"
			}
		}
	}
};

export default DeliveryIntegration;
