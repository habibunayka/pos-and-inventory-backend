import { jest } from "@jest/globals";
import GetUserUsecase from "../GetUserUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import AppError from "../../../../Commons/Errors/AppError.js";

describe("GetUserUsecase", () => {
	let mockUserService;
	let usecase;

	beforeEach(() => {
		mockUserService = {
			getUser: jest.fn()
		};
		usecase = new GetUserUsecase({ userService: mockUserService });
	});

	test("should throw when userService missing", () => {
		expect(() => new GetUserUsecase()).toThrow("GET_USER_USECASE.MISSING_USER_SERVICE");
	});

	test("should throw when id is invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid user id"));
	});

	test("should throw AppError when user not found", async () => {
		mockUserService.getUser.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(AppError);
	});

	test("should return user when found", async () => {
		const record = {
			id: 2,
			name: "John",
			email: "john@example.com",
			status: "active",
			pinCodeHash: null,
			userRoles: [{ role: { id: 10, name: "manager" }, placeId: 4 }]
		};
		mockUserService.getUser.mockResolvedValue(record);

		const result = await usecase.execute("2");

		expect(mockUserService.getUser).toHaveBeenCalledWith(2);
		expect(result).toMatchObject({ id: 2, name: "John", email: "john@example.com", authenticationMethod: "password" });
	});
});
