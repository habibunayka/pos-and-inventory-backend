import { describe, expect, it } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import LoginUser from "../LoginUser.js";

describe("LoginUser", () => {
	it("validates payload structure and required fields", () => {
		expect(() => new LoginUser(null)).toThrow("LOGIN_USER.PAYLOAD_NOT_OBJECT");
		expect(() => new LoginUser({ username: "user" })).toThrow("LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY");
		expect(() => new LoginUser({ username: 123, password: {} })).toThrow("LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
		expect(() => new LoginUser({ username: "   ", password: "secret" })).toThrow("LOGIN_USER.USERNAME_EMPTY");
	});

	it("trims username and keeps password as provided", () => {
		const user = new LoginUser({ username: "  demo  ", password: "s3cret" });

		expect(user).toBeInstanceOf(LoginUser);
		expect(user.username).toBe("demo");
		expect(user.password).toBe("s3cret");
	});
});
