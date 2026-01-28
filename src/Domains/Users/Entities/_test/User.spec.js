import { describe, expect, it } from "@jest/globals";
import Role from "../../../Roles/Entities/Role.js";
import User from "../User.js";

describe("User", () => {
	it("selects the earliest role assignment and uses pin authentication", () => {
		const record = {
			id: 10,
			name: "Example User",
			email: "Test@Example.com",
			status: "active",
			createdAt: "2024-01-01T00:00:00.000Z",
			updatedAt: "2024-01-02T00:00:00.000Z",
			pinCodeHash: "hashed-pin",
			userRoles: [
				{
					id: 5,
					placeId: 11,
					role: {
						id: 1,
						name: "Admin",
						description: "Admin role",
						rolePermissions: [{ permission: { name: "manage" } }]
					}
				},
				{
					id: 2,
					placeId: 99,
					role: {
						id: 2,
						name: "Cashier",
						rolePermissions: []
					}
				}
			]
		};

		const user = User.fromPersistence(record);

		expect(user.authenticationMethod).toBe("pin");
		expect(user.role).toBeInstanceOf(Role);
		expect(user.role.name).toBe("Cashier");
		expect(user.placeId).toBe(99);
		expect(user.createdAt).toBe("2024-01-01T00:00:00.000Z");
		expect(user.updatedAt).toBe("2024-01-02T00:00:00.000Z");
	});

	it("falls back when no roles are present and defaults to password auth", () => {
		const record = {
			id: 20,
			name: "No Role",
			email: "norole@example.test",
			status: "inactive",
			createdAt: "2024-01-03T00:00:00.000Z",
			updatedAt: "2024-01-04T00:00:00.000Z",
			userRoles: [
				{
					id: 7,
					placeId: 4
				}
			]
		};

		const user = User.fromPersistence(record);

		expect(user.authenticationMethod).toBe("password");
		expect(user.role).toBeNull();
		expect(user.placeId).toBe(4);
		expect(user.createdAt).toBe("2024-01-03T00:00:00.000Z");
		expect(user.updatedAt).toBe("2024-01-04T00:00:00.000Z");
	});

	it("normalizes email consistently", () => {
		expect(User.normalizeEmail("  Sample@Email.Com ")).toBe("sample@email.com");
		expect(User.normalizeEmail(null)).toBeNull();
		expect(User.normalizeEmail("   ")).toBeNull();
	});
});
