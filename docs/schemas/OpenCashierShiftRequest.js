const OpenCashierShiftRequest = {
	type: "object",
	required: ["stationId", "shiftId", "ipAddress"],
	properties: {
		placeId: {
			type: "integer",
			example: 1
		},
		stationId: {
			type: "integer",
			example: 3
		},
		shiftId: {
			type: "integer",
			example: 1
		},
		ipAddress: {
			type: "string",
			example: "127.0.0.1"
		},
		openingBalance: {
			type: "number",
			example: 0
		}
	}
};

export default OpenCashierShiftRequest;
