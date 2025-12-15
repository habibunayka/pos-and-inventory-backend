import { describe, expect, it } from "@jest/globals";
import CashierShift from "../CashierShift.js";

describe("CashierShift", () => {
	it("returns null when record is missing", () => {
		expect(CashierShift.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			placeId: "placeId-value-2",
			stationId: "stationId-value-3",
			shiftId: "shiftId-value-4",
			cashierId: "cashierId-value-5",
			openedAt: "openedAt-value-6",
			closedAt: "closedAt-value-7",
			openingBalance: "openingBalance-value-8",
			closingBalance: "closingBalance-value-9",
			systemBalance: "systemBalance-value-10",
			ipAddress: "ipAddress-value-11",
			status: "status-value-12"
		};

		const entity = CashierShift.fromPersistence(record);

		expect(entity).toBeInstanceOf(CashierShift);
		expect(entity).toMatchObject({
			id: "id-value-1",
			placeId: "placeId-value-2",
			stationId: "stationId-value-3",
			shiftId: "shiftId-value-4",
			cashierId: "cashierId-value-5",
			openedAt: "openedAt-value-6",
			closedAt: "closedAt-value-7",
			openingBalance: "openingBalance-value-8",
			closingBalance: "closingBalance-value-9",
			systemBalance: "systemBalance-value-10",
			ipAddress: "ipAddress-value-11",
			status: "status-value-12"
		});
	});

});
