import { describe, expect, it } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CashierUser from "../CashierUser.js";

describe("CashierUser", () => {
	it("throws when payload is not an object", () => {
		expect(() => new CashierUser(null)).toThrow(ValidationError);
	});

	it("validates required properties and types", () => {
		expect(() => new CashierUser({ name: "Alice" })).toThrow("CASHIER_USER.NOT_CONTAIN_NEEDED_PROPERTY");
		expect(() => new CashierUser({ name: 123, pin: "1234" })).toThrow("CASHIER_USER.NAME_NOT_STRING");
		expect(() => new CashierUser({ name: "Alice", pin: {} })).toThrow("CASHIER_USER.PIN_NOT_VALID_TYPE");
		expect(() => new CashierUser({ name: "Alice", pin: "1234", status: 1 })).toThrow("CASHIER_USER.STATUS_NOT_STRING");
		expect(() => new CashierUser({ name: "   ", pin: "1234" })).toThrow("CASHIER_USER.NAME_EMPTY");
	});

	it("normalizes placeId and validates numeric conversion", () => {
		expect(CashierUser.normalizePlaceId(undefined)).toBeNull();
		expect(CashierUser.normalizePlaceId("")).toBeNull();
		expect(CashierUser.normalizePlaceId(null)).toBeNull();
		expect(CashierUser.normalizePlaceId("7")).toBe(7);
		expect(() => CashierUser.normalizePlaceId("abc")).toThrow("CASHIER_USER.PLACE_ID_NOT_NUMBER");
	});

	it("trims values and applies defaults on success", () => {
		const user = new CashierUser({ name: "  Jane Cashier  ", pin: 5678 });
		const assignedPlace = new CashierUser({ name: "Jack", pin: "7890", status: "inactive", placeId: "5" });

		expect(user).toMatchObject({
			name: "Jane Cashier",
			pin: "5678",
			status: "active",
			placeId: null
		});
		expect(assignedPlace).toMatchObject({
			name: "Jack",
			pin: "7890",
			status: "inactive",
			placeId: 5
		});
	});
});
