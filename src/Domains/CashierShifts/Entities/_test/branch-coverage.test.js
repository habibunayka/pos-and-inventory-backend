import { describe, expect, it } from "@jest/globals";
import CashierShift from "../CashierShift.js";

describe("CashierShift entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(CashierShift.fromPersistence(null)).toBeNull();
	});

	it("CashierShift normalizes nullable balances and dates", () => {
		const entity = CashierShift.fromPersistence({
			placeId: 1,
			stationId: 2,
			shiftId: 3,
			cashierId: 4,
			openedAt: "open"
		});

		expect(entity).toMatchObject({
			id: null,
			closedAt: null,
			openingBalance: null,
			closingBalance: null,
			systemBalance: null
		});
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new CashierShift({
				placeId: 1,
				stationId: 2,
				shiftId: 3,
				cashierId: 4,
				openedAt: "open",
				ipAddress: "ip",
				status: "open"
			});

			expect(entity).toBeInstanceOf(CashierShift);
			expect(entity).toMatchObject({
				closedAt: null,
				openingBalance: null,
				closingBalance: null,
				systemBalance: null
			});
		});
	});
});
