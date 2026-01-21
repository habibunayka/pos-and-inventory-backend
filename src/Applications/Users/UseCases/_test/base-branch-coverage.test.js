import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import BaseUserUsecase from "../BaseUserUsecase.js";
import CreateUserUsecase from "../CreateUserUsecase.js";

describe("Users base usecase branch coverage", () => {
	class TestUserUsecase extends BaseUserUsecase {
		constructor() {
			super({ userService: { findRoleByName: jest.fn() } });
		}
	}

	it("BaseUserUsecase handles null role names and weak secrets", async () => {
		const usecase = new TestUserUsecase();
		await expect(usecase._findRole(null)).rejects.toThrow(ValidationError);
		expect(() => usecase._validatePin(null)).toThrow(ValidationError);
		expect(() => usecase._validatePassword(null)).toThrow(ValidationError);
	});

	it("CreateUserUsecase rejects missing payload", async () => {
		const usecase = new CreateUserUsecase({ userService: { createUser: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});
});
