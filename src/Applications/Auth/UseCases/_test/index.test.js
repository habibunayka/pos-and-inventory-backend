import { LoginUsecase, LogoutUsecase } from "../index.js";

describe("Auth UseCases index exports", () => {
	test("LoginUsecase should be exported", () => {
		expect(LoginUsecase).toBeDefined();
		expect(typeof LoginUsecase).toBe("function");
	});

	test("LogoutUsecase should be exported", () => {
		expect(LogoutUsecase).toBeDefined();
		expect(typeof LogoutUsecase).toBe("function");
	});
});
