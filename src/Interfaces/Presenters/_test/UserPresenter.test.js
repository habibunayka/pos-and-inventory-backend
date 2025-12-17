import UserPresenter from "../UserPresenter.js";

describe("UserPresenter", () => {
	const presenter = new UserPresenter();

	test("should map user with role", () => {
		const presented = presenter.present({
			id: 1,
			name: "John",
			email: "john@example.com",
			status: "active",
			role: { id: 2, name: "manager", description: "desc" },
			placeId: 10,
			authenticationMethod: "password"
		});

		expect(presented).toEqual({
			id: 1,
			name: "John",
			email: "john@example.com",
			status: "active",
			role: { id: 2, name: "manager", description: "desc" },
			placeId: 10,
			authenticationMethod: "password"
		});
	});

	test("should present collection and handle null role", () => {
		const result = presenter.presentCollection([
			{
				id: 2,
				name: "NoRole",
				email: null,
				status: "inactive",
				role: null,
				placeId: null,
				authenticationMethod: "pin"
			}
		]);

		expect(result).toEqual([
			{
				id: 2,
				name: "NoRole",
				email: null,
				status: "inactive",
				role: null,
				placeId: null,
				authenticationMethod: "pin"
			}
		]);
	});
});
