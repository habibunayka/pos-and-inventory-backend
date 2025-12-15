import { describe, expect, it, beforeEach, afterAll, jest } from "@jest/globals";

const originalSecret = process.env.JWT_SECRET;

const loadHelper = async ({ forceFallback = false } = {}) => {
	jest.resetModules();
	jest.unmock("node:module");
	jest.unmock("jsonwebtoken");

	if (forceFallback) {
		jest.unstable_mockModule("node:module", () => {
			const actual = jest.requireActual("node:module");
			return {
				createRequire: (url) => {
					const realRequire = actual.createRequire(url);
					return (specifier) => {
						if (specifier === "jsonwebtoken") {
							throw new Error("missing");
						}
						return realRequire(specifier);
					};
				}
			};
		});
	}

	return import("../JwtHelper.js");
};

describe("JwtHelper", () => {
	beforeEach(() => {
		process.env.JWT_SECRET = "test-secret";
	});

	afterAll(() => {
		process.env.JWT_SECRET = originalSecret;
	});

	it("signs and verifies tokens with default secret", async () => {
		const { signToken, verifyToken } = await loadHelper();
		const token = signToken({ userId: 1 });
		const decoded = verifyToken(token);

		expect(decoded.userId).toBe(1);
	});

	it("supports custom secret overrides", async () => {
		const { signToken, verifyToken } = await loadHelper();
		const token = signToken({ scope: "custom" }, { secret: "alt-secret" });
		expect(() => verifyToken(token, { secret: "wrong" })).toThrow();
		const decoded = verifyToken(token, { secret: "alt-secret" });
		expect(decoded.scope).toBe("custom");
	});

	it("validates inputs", async () => {
		const { signToken, verifyToken } = await loadHelper();
		expect(() => signToken(null)).toThrow("JWT_HELPER.INVALID_PAYLOAD");
		expect(() => verifyToken("")).toThrow("JWT_HELPER.MISSING_TOKEN");
		delete process.env.JWT_SECRET;
		expect(() => signToken({ ok: true })).toThrow("JWT_HELPER.MISSING_SECRET");
	});

	it("falls back to vendor implementation when jsonwebtoken is unavailable", async () => {
		const { signToken: fallbackSign, verifyToken: fallbackVerify } = await loadHelper({ forceFallback: true });
		const token = fallbackSign({ id: 123 }, { secret: "alt-secret", expiresIn: "1h" });
		const decoded = fallbackVerify(token, { secret: "alt-secret" });

		expect(decoded.id).toBe(123);
	});

	describe("VendorJsonWebToken", () => {
		const importVendor = async () => {
			jest.resetModules();
			return import("../VendorJsonWebToken.cjs");
		};

		it("validates signing inputs", async () => {
			const { sign } = await importVendor();

			expect(() => sign(null, "secret")).toThrow("JWT sign payload must be an object");
			expect(() => sign({ ok: true }, "")).toThrow("JWT secret must be a non-empty string");
		});

		it("validates verification inputs and signatures", async () => {
			const { sign, verify } = await importVendor();

			expect(() => verify("", "secret")).toThrow("JWT token must be a non-empty string");
			expect(() => verify("abc.def", "")).toThrow("JWT secret must be a non-empty string");
			expect(() => verify("abc.def", "secret")).toThrow("Invalid JWT token structure");

			const token = sign({ id: 1 }, "secret");
			expect(() => verify(token, "other")).toThrow("Invalid JWT signature");
		});

		it("honors expiration and activation claims", async () => {
			const { sign, verify } = await importVendor();

			jest.useFakeTimers();
			try {
				const expiringToken = sign({ id: 2 }, "secret", { expiresIn: 1 });
				jest.setSystemTime(Date.now() + 2000);
				expect(() => verify(expiringToken, "secret")).toThrow("JWT expired");

				jest.setSystemTime(Date.now());
				const nbfToken = sign({ id: 3 }, "secret", { notBefore: "10s" });
				expect(() => verify(nbfToken, "secret")).toThrow("JWT not active");
			} finally {
				jest.useRealTimers();
			}
		});

		it("parses diverse expiration formats", async () => {
			const { sign, verify } = await importVendor();

			const numericToken = sign({ n: 1 }, "secret", { expiresIn: 5 });
			expect(verify(numericToken, "secret").exp).toBeGreaterThan(0);

			const parsedIntToken = sign({ s: 1 }, "secret", { expiresIn: "15" });
			expect(verify(parsedIntToken, "secret").exp).toBeGreaterThan(0);

			const withoutExp = sign({ none: true }, "secret", { expiresIn: {} });
			expect(verify(withoutExp, "secret").exp).toBeUndefined();
		});
	});
});
