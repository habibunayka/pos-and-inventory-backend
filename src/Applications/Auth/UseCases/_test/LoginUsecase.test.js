import { jest } from "@jest/globals";
import LoginUsecase from "../LoginUsecase.js";
import AppError from "../../../../Commons/Errors/AppError.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import User from "../../../../Domains/Users/Entities/User.js";

describe("LoginUsecase", () => {
	let mockUserService;
	let mockTokenSigner;
	let mockVerifySecret;

	beforeEach(() => {
		mockUserService = {
			findByEmail: jest.fn(),
			findByName: jest.fn()
		};

		mockTokenSigner = jest.fn(() => "signed.token.value");
		mockVerifySecret = jest.fn();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should throw if userService is missing", () => {
		expect(() => new LoginUsecase()).toThrow("LOGIN_USECASE.MISSING_USER_SERVICE");
	});

	test("should throw if tokenSigner is not a function", () => {
		expect(
			() =>
				new LoginUsecase({
					userService: mockUserService,
					tokenSigner: "bukan-fungsi"
				})
		).toThrow("LOGIN_USECASE.INVALID_TOKEN_SIGNER");
	});

	test("should login using email", async () => {
		mockUserService.findByEmail.mockResolvedValue({
			id: "123",
			name: "Habib",
			role: { name: "admin" },
			placeId: "P001",
			passwordHash: "abc123",
			status: "active"
		});

		mockVerifySecret.mockResolvedValue(true);

		const usecase = new LoginUsecase({
			userService: mockUserService,
			tokenSigner: mockTokenSigner,
			verifySecretFn: mockVerifySecret
		});

		const result = await usecase.execute({
			username: "habib@example.com",
			password: "password123"
		});

		expect(mockUserService.findByEmail).toHaveBeenCalledWith("habib@example.com");
		expect(mockTokenSigner).toHaveBeenCalled();
		expect(result.token).toBe("signed.token.value");
		expect(result.user).toBeDefined();
	});

	test("should login using username", async () => {
		mockUserService.findByEmail.mockResolvedValue(null);

		mockUserService.findByName.mockResolvedValue({
			id: "999",
			name: "Nano",
			role: { name: "user" },
			placeId: "P002",
			passwordHash: "hashed",
			status: "active"
		});

		mockVerifySecret.mockResolvedValue(true);

		const usecase = new LoginUsecase({
			userService: mockUserService,
			tokenSigner: mockTokenSigner,
			verifySecretFn: mockVerifySecret
		});

		const result = await usecase.execute({
			username: "nano",
			password: "123"
		});

		expect(mockUserService.findByName).toHaveBeenCalledWith("nano");
		expect(result.token).toBe("signed.token.value");
	});

	test("should fallback to username lookup when email normalization returns null", async () => {
		jest.spyOn(User, "normalizeEmail").mockReturnValue(null);
		mockUserService.findByName.mockResolvedValue({
			id: "777",
			name: "Nano",
			role: { name: "user" },
			placeId: "P003",
			passwordHash: "hashed",
			status: "active"
		});

		mockVerifySecret.mockResolvedValue(true);

		const usecase = new LoginUsecase({
			userService: mockUserService,
			tokenSigner: mockTokenSigner,
			verifySecretFn: mockVerifySecret
		});

		await usecase.execute({
			username: "nano",
			password: "123"
		});

		expect(mockUserService.findByEmail).not.toHaveBeenCalled();
		expect(mockUserService.findByName).toHaveBeenCalledWith("nano");
	});

	test("should throw if user not found", async () => {
		mockUserService.findByEmail.mockResolvedValue(null);
		mockUserService.findByName.mockResolvedValue(null);

		const usecase = new LoginUsecase({
			userService: mockUserService,
			verifySecretFn: mockVerifySecret
		});

		await expect(usecase.execute({ username: "ghost", password: "pw" })).rejects.toThrow(AppError);
	});

	test("should throw if user not active", async () => {
		mockUserService.findByEmail.mockResolvedValue({
			status: "banned",
			passwordHash: "xxx"
		});

		const usecase = new LoginUsecase({
			userService: mockUserService,
			verifySecretFn: mockVerifySecret
		});

		await expect(usecase.execute({ username: "habib", password: "pw" })).rejects.toThrow(AppError);
	});

	test("should throw if hashed secret missing", async () => {
		mockUserService.findByEmail.mockResolvedValue({
			status: "active"
		});

		const usecase = new LoginUsecase({
			userService: mockUserService,
			verifySecretFn: mockVerifySecret
		});

		await expect(usecase.execute({ username: "habib", password: "pw" })).rejects.toThrow(
			"Invalid username or password"
		);
	});

	test("should throw if password invalid", async () => {
		mockUserService.findByEmail.mockResolvedValue({
			status: "active",
			passwordHash: "hashed"
		});

		mockVerifySecret.mockResolvedValue(false);

		const usecase = new LoginUsecase({
			userService: mockUserService,
			verifySecretFn: mockVerifySecret
		});

		await expect(usecase.execute({ username: "habib", password: "wrongpw" })).rejects.toThrow(
			"Invalid username or password"
		);
	});

	test("should generate token with expiresIn", async () => {
		mockUserService.findByEmail.mockResolvedValue({
			id: "1",
			name: "Habib",
			role: { name: "admin" },
			placeId: "ABC",
			passwordHash: "hashed",
			status: "active"
		});

		mockVerifySecret.mockResolvedValue(true);

		const usecase = new LoginUsecase({
			userService: mockUserService,
			tokenSigner: mockTokenSigner,
			verifySecretFn: mockVerifySecret,
			tokenExpiresIn: "2h"
		});

		await usecase.execute({
			username: "habib",
			password: "pw"
		});

		expect(mockTokenSigner).toHaveBeenCalledWith(expect.any(Object), { expiresIn: "2h" });
	});

	test("should omit expiresIn when tokenExpiresIn is null", async () => {
		mockUserService.findByEmail.mockResolvedValue({
			id: "10",
			name: "Habib",
			role: { name: "admin" },
			placeId: "ABC",
			passwordHash: "hashed",
			status: "active"
		});

		mockVerifySecret.mockResolvedValue(true);

		const usecase = new LoginUsecase({
			userService: mockUserService,
			tokenSigner: mockTokenSigner,
			verifySecretFn: mockVerifySecret,
			tokenExpiresIn: null
		});

		await usecase.execute({
			username: "habib",
			password: "pw"
		});

		expect(mockTokenSigner).toHaveBeenCalledWith(expect.any(Object), {});
	});

	test("should reject when payload missing", async () => {
		const usecase = new LoginUsecase({
			userService: mockUserService,
			verifySecretFn: mockVerifySecret
		});

		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});
});
