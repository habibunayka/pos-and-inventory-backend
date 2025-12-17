const UpdateStationRequest = {
	type: "object",
	minProperties: 1,
	properties: {
		placeId: {
			type: "integer",
			example: 1
		},
		name: {
			type: "string",
			example: "Drive Thru Window"
		},
		description: {
			type: "string",
			nullable: true,
			example: "Secondary till for rush hours"
		},
		isActive: {
			type: "boolean",
			example: false
		}
	}
};

export default UpdateStationRequest;
