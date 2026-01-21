import { describe, expect, it } from "@jest/globals";
import User from "../User.js";

describe("User entity branch coverage", () => {
	it("User handles empty assignments and password auth", () => {
		const user = User.fromPersistence({
			id: 1,
			name: "NoRole",
			email: "user@example.test",
			status: "active",
			userRoles: []
		});
		expect(user.role).toBeNull();
		expect(user.authenticationMethod).toBe("password");
		expect(user.placeId).toBeNull();
	});

	it("User picks the first role assignment and pin auth", () => {
		const user = User.fromPersistence({
			id: 2,
			name: "RoleUser",
			email: "role@example.test",
			status: "inactive",
			pinCodeHash: "hashed",
			userRoles: [
				{ id: 20, placeId: 88, role: { id: 7, name: "Admin" } },
				{ id: 10, placeId: 77, role: { id: 5, name: "Manager" } }
			]
		});

		expect(user.authenticationMethod).toBe("pin");
		expect(user.role?.name).toBe("Manager");
		expect(user.placeId).toBe(77);
	});

	it("User sorts assignments with missing ids", () => {
		const user = User.fromPersistence({
			id: 3,
			name: "SortUser",
			email: "sort@example.test",
			status: "active",
			userRoles: [
				{ id: null, placeId: 10, role: { id: 1, name: "Cashier" } },
				{ id: 2, placeId: 20, role: { id: 2, name: "Manager" } }
			]
		});

		expect(user.role?.name).toBe("Manager");
		expect(user.placeId).toBe(20);
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new User({ name: "CtorUser" });
			expect(entity).toBeInstanceOf(User);
			expect(entity).toMatchObject({
				email: null,
				status: "active",
				authenticationMethod: "password",
				placeId: null
			});
		});
	});
});
