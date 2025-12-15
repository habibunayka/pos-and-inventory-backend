import * as usecases from "../index.js";
import ListUsersUsecase from "../ListUsersUsecase.js";
import GetUserUsecase from "../GetUserUsecase.js";
import CreateUserUsecase from "../CreateUserUsecase.js";
import UpdateUserUsecase from "../UpdateUserUsecase.js";

describe("Users Usecases index exports", () => {
	test("should export ListUsersUsecase", () => {
		expect(usecases.ListUsersUsecase).toBe(ListUsersUsecase);
	});

	test("should export GetUserUsecase", () => {
		expect(usecases.GetUserUsecase).toBe(GetUserUsecase);
	});

	test("should export CreateUserUsecase", () => {
		expect(usecases.CreateUserUsecase).toBe(CreateUserUsecase);
	});

	test("should export UpdateUserUsecase", () => {
		expect(usecases.UpdateUserUsecase).toBe(UpdateUserUsecase);
	});
});
