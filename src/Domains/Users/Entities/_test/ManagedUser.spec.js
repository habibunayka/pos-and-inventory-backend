import { describe, expect, it } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import ManagedUser from "../ManagedUser.js";

describe("ManagedUser", () => {
	it("rejects invalid payloads and missing properties", () => {
		expect(() => new ManagedUser(null)).toThrow("MANAGED_USER.PAYLOAD_NOT_OBJECT");
		expect(() => new ManagedUser({ name: "Name", email: "user@example.com" })).toThrow(
			"MANAGED_USER.NOT_CONTAIN_NEEDED_PROPERTY"
		);
		expect(() => new ManagedUser({ name: 123, email: "user@example.com", password: "pass" })).toThrow(
			"MANAGED_USER.NAME_NOT_STRING"
		);
		expect(() => new ManagedUser({ name: "Name", email: 123, password: "pass" })).toThrow(
			"MANAGED_USER.EMAIL_NOT_STRING"
		);
		expect(() => new ManagedUser({ name: "Name", email: "user@example.com", password: 123 })).toThrow(
			"MANAGED_USER.PASSWORD_NOT_STRING"
		);
		expect(() => new ManagedUser({ name: "   ", email: "user@example.com", password: "pass" })).toThrow(
			"MANAGED_USER.NAME_EMPTY"
		);
		expect(() => new ManagedUser({ name: "Name", email: "   ", password: "pass" })).toThrow(
			"MANAGED_USER.EMAIL_INVALID"
		);
		expect(() => new ManagedUser({ name: "Name", email: "user@example.com", password: "pass", status: 1 })).toThrow(
			"MANAGED_USER.STATUS_NOT_STRING"
		);
	});

	it("normalizes helpers correctly", () => {
		expect(ManagedUser.normalizeEmail(undefined)).toBeNull();
		expect(ManagedUser.normalizeEmail("  MixedCase@Email.Com  ")).toBe("mixedcase@email.com");
		expect(ManagedUser.normalizeEmail("   ")).toBeNull();
		expect(ManagedUser.normalizePlaceId(null)).toBeNull();
		expect(ManagedUser.normalizePlaceId("")).toBeNull();
		expect(ManagedUser.normalizePlaceId("42")).toBe(42);
		expect(() => ManagedUser.normalizePlaceId("abc")).toThrow("MANAGED_USER.PLACE_ID_NOT_NUMBER");
	});

	it("constructs a managed user with normalized values", () => {
		const user = new ManagedUser({
			name: "  Manager  ",
			email: "Manager@Example.com ",
			password: "secret",
			placeId: "12"
		});

		expect(user).toBeInstanceOf(ManagedUser);
		expect(user).toMatchObject({
			name: "Manager",
			email: "manager@example.com",
			password: "secret",
			status: "active",
			placeId: 12
		});
	});
});
