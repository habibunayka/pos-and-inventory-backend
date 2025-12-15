import { describe, expect, it } from "@jest/globals";
import Role from "../Role.js";

describe("Role", () => {
	it("returns null when record is missing", () => {
		expect(Role.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record and filters invalid permissions", () => {
		const record = {
			id: 1,
			name: "Admin",
			description: "Full access",
			rolePermissions: [
				{ permission: { name: "manage_users" } },
				{ permission: null },
				{ permission: { name: undefined } }
			]
		};

		const role = Role.fromPersistence(record);

		expect(role).toBeInstanceOf(Role);
		expect(role.permissions).toEqual(["manage_users"]);
		expect(role.name).toBe("Admin");
		expect(role.description).toBe("Full access");
		expect(role.isCashier()).toBe(false);
	});

	it("detects cashier roles regardless of casing", () => {
		const role = new Role({ id: 2, name: "CaShIeR" });

		expect(role.isCashier()).toBe(true);
	});
});
