import BaseTransactionUsecase from "../BaseTransactionUsecase.js";
import AppError from "../../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../../Commons/Constants/HttpStatus.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import { verifySecret } from "../../../../Commons/Utils/HashPassword.js";

export default class VoidTransactionUsecase extends BaseTransactionUsecase {
	constructor({ transactionService, userService, verifySecretFn = verifySecret } = {}) {
		super();
		if (!transactionService) {
			throw new Error("VOID_TRANSACTION.MISSING_TRANSACTION_SERVICE");
		}
		if (!userService) {
			throw new Error("VOID_TRANSACTION.MISSING_USER_SERVICE");
		}
		if (typeof verifySecretFn !== "function") {
			throw new Error("VOID_TRANSACTION.INVALID_SECRET_VERIFIER");
		}
		this.transactionService = transactionService;
		this.userService = userService;
		this.verifySecretFn = verifySecretFn;
	}

	async execute(id, payload = {}, user = null) {
		const intId = this._positiveInt(id, "id");
		this._ensureObject(payload);
				if (!user || !user.id) {
						throw new AppError("Authentication required", HttpStatus.UNAUTHORIZED);
				}

				const secret = String(payload.password ?? "").trim();
				const reason = String(payload.reason ?? "").trim();
				if (!secret) {
						throw new ValidationError("password is required");
				}
				if (!reason) {
						throw new ValidationError("reason is required");
				}

				const authMethod = user.authenticationMethod === "pin" ? "pin" : "password";
				const userId = this._positiveInt(user.id, "userId");
				const record = await this.userService.getUser(userId);

		if (!record) {
			throw new AppError("User not found", HttpStatus.UNAUTHORIZED);
		}

		const hashedSecret = authMethod === "pin" ? record.pinCodeHash : record.passwordHash;

		if (!hashedSecret) {
			throw new AppError("Invalid pin or password", HttpStatus.UNAUTHORIZED);
		}

		const isValidSecret = await this.verifySecretFn(secret, hashedSecret);
		if (!isValidSecret) {
			throw new AppError("Invalid pin or password", HttpStatus.UNAUTHORIZED);
		}

				const updated = await this.transactionService.updateTransaction({
						id: intId,
						data: { status: "cancelled", voidReason: reason }
				});

		if (!updated) {
			throw new AppError("Transaction not found", HttpStatus.NOT_FOUND);
		}

		return updated;
	}
}
