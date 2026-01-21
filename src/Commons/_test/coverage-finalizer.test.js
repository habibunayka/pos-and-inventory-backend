import { describe, expect, it, jest } from "@jest/globals";

async function loadJwtHelperWithFallback(fallbackModule) {
	jest.resetModules();
	await jest.unstable_mockModule("node:module", () => ({
		createRequire: () => (moduleName) => {
			if (moduleName === "jsonwebtoken") {
				throw new Error("no jsonwebtoken");
			}
			if (moduleName.endsWith("VendorJsonWebToken.cjs")) {
				return fallbackModule;
			}
			throw new Error(`Unexpected module: ${moduleName}`);
		}
	}));
	return import("../Utils/JwtHelper.js");
}

describe("JwtHelper fallback branches", () => {
	it("uses vendor fallback with and without default export", async () => {
		const originalSecret = process.env.JWT_SECRET;
		process.env.JWT_SECRET = "secret";

		const sign = jest.fn().mockReturnValue("token");
		const verify = jest.fn().mockReturnValue({ sub: 1 });
		const helperWithDefault = await loadJwtHelperWithFallback({ default: { sign, verify } });
		expect(helperWithDefault.signToken({ sub: 1 })).toBe("token");
		expect(sign).toHaveBeenCalled();

		const signAlt = jest.fn().mockReturnValue("token2");
		const verifyAlt = jest.fn().mockReturnValue({ sub: 2 });
		const helperWithoutDefault = await loadJwtHelperWithFallback({ sign: signAlt, verify: verifyAlt });
		expect(helperWithoutDefault.verifyToken("token2")).toEqual({ sub: 2 });
		expect(verifyAlt).toHaveBeenCalled();

		process.env.JWT_SECRET = originalSecret;
	});
});
