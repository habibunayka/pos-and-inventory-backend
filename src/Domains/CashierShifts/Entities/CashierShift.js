export default class CashierShift {
	constructor({
		id = null,
		placeId,
		stationId,
		shiftId,
		cashierId,
		openedAt,
		closedAt = null,
		openingBalance = null,
		closingBalance = null,
		systemBalance = null,
		ipAddress,
		status
	}) {
		this.id = id;
		this.placeId = placeId;
		this.stationId = stationId;
		this.shiftId = shiftId;
		this.cashierId = cashierId;
		this.openedAt = openedAt;
		this.closedAt = closedAt;
		this.openingBalance = openingBalance;
		this.closingBalance = closingBalance;
		this.systemBalance = systemBalance;
		this.ipAddress = ipAddress;
		this.status = status;
	}

	static fromPersistence(record) {
		if (!record) return null;
		return new CashierShift({
			id: record.id ?? null,
			placeId: record.placeId,
			stationId: record.stationId,
			shiftId: record.shiftId,
			cashierId: record.cashierId,
			openedAt: record.openedAt,
			closedAt: record.closedAt ?? null,
			openingBalance: record.openingBalance ?? null,
			closingBalance: record.closingBalance ?? null,
			systemBalance: record.systemBalance ?? null,
			ipAddress: record.ipAddress,
			status: record.status
		});
	}
}
