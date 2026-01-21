import { describe, expect, it } from "@jest/globals";
import UserService from "../UserService.js";
import UserRepository from "../../../../Domains/Users/Repositories/UserRepository.js";

describe("UserService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new UserRepository();
		const service = new UserService({ userRepository: repo });
		expect(service).toBeInstanceOf(UserService);
	});
});
