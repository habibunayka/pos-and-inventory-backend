import { jest } from "@jest/globals";
import DeletePaymentMethodUsecase from "../DeletePaymentMethodUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeletePaymentMethodUsecase", () => {
	let paymentMethodService;
	let usecase;

	beforeEach(() => {
		paymentMethodService = { deletePaymentMethod: jest.fn() };
		usecase = new DeletePaymentMethodUsecase({ paymentMethodService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeletePaymentMethodUsecase()).toThrow("PAYMENTMETHOD_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		paymentMethodService.deletePaymentMethod.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Payment method not found"));
	});

	test("should delete payment method", async () => {
		paymentMethodService.deletePaymentMethod.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(paymentMethodService.deletePaymentMethod).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
