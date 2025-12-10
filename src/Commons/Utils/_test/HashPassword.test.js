import { afterEach, describe, expect, it, jest } from "@jest/globals";
import crypto from "node:crypto";
import { hashSecret, verifySecret } from "../HashPassword.js";

describe("HashPassword utils", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("rejects non-string or empty values", async () => {
		await expect(hashSecret("")).rejects.toThrow("Value to hash must be a non-empty string");
		await expect(hashSecret(123)).rejects.toThrow("Value to hash must be a non-empty string");
	});

	it("hashes and verifies secrets", async () => {
		const hashed = await hashSecret("super-secret");

		expect(hashed).toContain(":");
		await expect(verifySecret("super-secret", hashed)).resolves.toBe(true);
	});

	it("returns false for invalid or missing hashes", async () => {
		await expect(verifySecret("value", null)).resolves.toBe(false);
		await expect(verifySecret("value", "invalid-format")).resolves.toBe(false);
	});

	it("propagates hashing errors", async () => {
		const scryptError = new Error("scrypt failed");
		jest.spyOn(crypto, "scrypt").mockImplementation((...args) => {
			const callback = args[args.length - 1];
			callback(scryptError);
		});

		await expect(hashSecret("value")).rejects.toThrow(scryptError);
	});

	it("propagates verification errors", async () => {
		const scryptError = new Error("verify failed");
		jest.spyOn(crypto, "scrypt").mockImplementation((...args) => {
			const callback = args[args.length - 1];
			callback(scryptError);
		});

		await expect(verifySecret("value", "aa:bb")).rejects.toThrow(scryptError);
	});

	it("rejects when timing-safe comparison fails", async () => {
		const hashed = await hashSecret("another-secret");
		jest.spyOn(crypto, "timingSafeEqual").mockImplementation(() => {
			throw new Error("compare failed");
		});

		await expect(verifySecret("another-secret", hashed)).rejects.toThrow("compare failed");
	});
});
