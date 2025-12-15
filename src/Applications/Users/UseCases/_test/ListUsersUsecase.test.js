import { jest } from "@jest/globals";
import ListUsersUsecase from "../ListUsersUsecase.js";

describe("ListUsersUsecase", () => {
	let mockUserService;
	let usecase;

	beforeEach(() => {
		mockUserService = {
			listUsers: jest.fn()
		};
		usecase = new ListUsersUsecase({ userService: mockUserService });
	});

	test("should throw when userService missing", () => {
		expect(() => new ListUsersUsecase()).toThrow("LIST_USERS_USECASE.MISSING_USER_SERVICE");
	});

	test("should map records to User entities", async () => {
		const records = [
			{
				id: 1,
				name: "John",
				email: "john@example.com",
				status: "active",
				pinCodeHash: null,
				userRoles: [{ role: { id: 10, name: "manager" }, placeId: 4 }]
			},
			{
				id: 2,
				name: "Cash",
				email: null,
				status: "active",
				pinCodeHash: "hashed",
				userRoles: [{ role: { id: 1, name: "cashier" }, placeId: null }]
			}
		];
		mockUserService.listUsers.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(mockUserService.listUsers).toHaveBeenCalledTimes(1);
		expect(result).toHaveLength(2);
		expect(result[0]).toMatchObject({ id: 1, email: "john@example.com", authenticationMethod: "password" });
		expect(result[1]).toMatchObject({ id: 2, email: null, authenticationMethod: "pin" });
	});
});
