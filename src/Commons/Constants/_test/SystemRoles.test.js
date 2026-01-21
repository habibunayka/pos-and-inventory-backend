import { describe, expect, it } from "@jest/globals";
import { SYSTEM_ROLE_NAMES, SYSTEM_ROLE_SET, assertValidSystemRole, isValidSystemRole } from "../SystemRoles.js";

describe("SystemRoles", () => {
	it("validates and normalizes role names", () => {
		const normalized = assertValidSystemRole("  ADMIN ");

		expect(normalized).toBe("admin");
		expect(SYSTEM_ROLE_SET.has(normalized)).toBe(true);
		expect(SYSTEM_ROLE_NAMES).toContain(normalized);
	});

	it("rejects invalid roles", () => {
		expect(() => assertValidSystemRole("guest")).toThrow(
			"Invalid system role: guest. Expected one of: admin, manager, cashier"
		);
		expect(() => assertValidSystemRole("   ")).toThrow(
			"Invalid system role: <empty>. Expected one of: admin, manager, cashier"
		);
	});

	it("checks validity without throwing", () => {
		expect(isValidSystemRole("manager")).toBe(true);
		expect(isValidSystemRole("nope")).toBe(false);
	});

	it("handles undefined values", () => {
		expect(isValidSystemRole()).toBe(false);
		expect(() => assertValidSystemRole()).toThrow("Invalid system role: <empty>");
	});
});
