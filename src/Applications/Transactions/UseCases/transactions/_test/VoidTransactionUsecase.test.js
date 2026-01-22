import { jest } from "@jest/globals";
import VoidTransactionUsecase from "../VoidTransactionUsecase.js";
import AppError from "../../../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../../../Commons/Constants/HttpStatus.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("VoidTransactionUsecase", () => {
	test("should throw when transaction service missing", () => {
		expect(() => new VoidTransactionUsecase({ userService: {} })).toThrow(
			"VOID_TRANSACTION.MISSING_TRANSACTION_SERVICE"
		);
	});

	test("should throw when user service missing", () => {
		expect(() => new VoidTransactionUsecase({ transactionService: {} })).toThrow(
			"VOID_TRANSACTION.MISSING_USER_SERVICE"
		);
	});

	test("should throw when secret verifier invalid", () => {
		expect(
			() =>
				new VoidTransactionUsecase({
					transactionService: {},
					userService: {},
					verifySecretFn: "invalid"
				})
		).toThrow("VOID_TRANSACTION.INVALID_SECRET_VERIFIER");
	});

	test("should allow default verifier when omitted", () => {
		const usecase = new VoidTransactionUsecase({ transactionService: {}, userService: {} });
		expect(usecase).toBeInstanceOf(VoidTransactionUsecase);
	});

	test("should require authenticated user", async () => {
		const usecase = new VoidTransactionUsecase({
			transactionService: {},
			userService: {},
			verifySecretFn: jest.fn()
		});

		await expect(
			usecase.execute(1, { password: "secret", reason: "because" })
		).rejects.toThrow(new AppError("Authentication required", HttpStatus.UNAUTHORIZED));
	});

	test("should require password when missing", async () => {
		const transactionService = { updateTransaction: jest.fn() };
		const userService = { getUser: jest.fn() };
		const usecase = new VoidTransactionUsecase({
			transactionService,
			userService,
			verifySecretFn: jest.fn()
		});

		await expect(usecase.execute(1, { reason: "because" }, { id: 1 })).rejects.toThrow(
			new ValidationError("password is required")
		);
	});

	test("should require reason when missing", async () => {
		const transactionService = { updateTransaction: jest.fn() };
		const userService = { getUser: jest.fn() };
		const usecase = new VoidTransactionUsecase({
			transactionService,
			userService,
			verifySecretFn: jest.fn()
		});

		await expect(usecase.execute(1, { password: "secret" }, { id: 1 })).rejects.toThrow(
			new ValidationError("reason is required")
		);
	});

	test("should reject when user record missing", async () => {
		const transactionService = { updateTransaction: jest.fn() };
		const userService = { getUser: jest.fn().mockResolvedValue(null) };
		const usecase = new VoidTransactionUsecase({
			transactionService,
			userService,
			verifySecretFn: jest.fn()
		});

		await expect(
			usecase.execute(1, { password: "secret", reason: "because" }, { id: 2 })
		).rejects.toThrow(new AppError("User not found", HttpStatus.UNAUTHORIZED));
	});

	test("should reject when stored secret missing", async () => {
		const transactionService = { updateTransaction: jest.fn() };
		const userService = { getUser: jest.fn().mockResolvedValue({ id: 3, passwordHash: null }) };
		const usecase = new VoidTransactionUsecase({
			transactionService,
			userService,
			verifySecretFn: jest.fn()
		});

		await expect(
			usecase.execute(1, { password: "secret", reason: "because" }, { id: 3 })
		).rejects.toThrow(new AppError("Invalid pin or password", HttpStatus.UNAUTHORIZED));
	});

	test("should reject when secret verification fails", async () => {
		const transactionService = { updateTransaction: jest.fn() };
		const userService = { getUser: jest.fn().mockResolvedValue({ id: 4, passwordHash: "hash" }) };
		const verifySecretFn = jest.fn().mockResolvedValue(false);
		const usecase = new VoidTransactionUsecase({ transactionService, userService, verifySecretFn });

		await expect(
			usecase.execute(1, { password: "secret", reason: "because" }, { id: 4 })
		).rejects.toThrow(new AppError("Invalid pin or password", HttpStatus.UNAUTHORIZED));
	});

	test("should reject when transaction not found", async () => {
		const transactionService = { updateTransaction: jest.fn().mockResolvedValue(null) };
		const userService = { getUser: jest.fn().mockResolvedValue({ id: 5, passwordHash: "hash" }) };
		const verifySecretFn = jest.fn().mockResolvedValue(true);
		const usecase = new VoidTransactionUsecase({ transactionService, userService, verifySecretFn });

		await expect(
			usecase.execute(1, { password: "secret", reason: "because" }, { id: 5 })
		).rejects.toThrow(new AppError("Transaction not found", HttpStatus.NOT_FOUND));
	});

	test("should void transaction using pin auth", async () => {
		const updated = { id: 6, status: "cancelled" };
		const transactionService = { updateTransaction: jest.fn().mockResolvedValue(updated) };
		const userService = { getUser: jest.fn().mockResolvedValue({ id: 6, pinCodeHash: "pinhash" }) };
		const verifySecretFn = jest.fn().mockResolvedValue(true);
		const usecase = new VoidTransactionUsecase({ transactionService, userService, verifySecretFn });

		const result = await usecase.execute(
			6,
			{ password: "1234", reason: "  customer cancelled  " },
			{ id: 6, authenticationMethod: "pin" }
		);

		expect(verifySecretFn).toHaveBeenCalledWith("1234", "pinhash");
		expect(transactionService.updateTransaction).toHaveBeenCalledWith({
			id: 6,
			data: { status: "cancelled", voidReason: "customer cancelled" }
		});
		expect(result).toEqual(updated);
	});
});
